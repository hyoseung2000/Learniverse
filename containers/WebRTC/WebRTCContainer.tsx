/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Device } from 'mediasoup-client';
import {
  Consumer,
  Producer,
  RtpCapabilities,
  Transport,
  UnsupportedError,
} from 'mediasoup-client/lib/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import io from 'socket.io-client';
import { styled } from 'styled-components';

import { memberIdState } from '@/recoil/atom';
import { CustomSocket, MediaType, ProducerList } from '@/types/socket';

import RTCVideo from './RTCVideo';
import socketPromise from './socketPromise';

const MEDIA_SERVER_URL = process.env.NEXT_PUBLIC_MEDIA_IP;

const WebRTCContainer = () => {
  const router = useRouter();
  const { room_id } = router.query;
  const name = useRecoilValue(memberIdState);
  const [curName, setCurName] = useState<string>();
  const [curRoomId, setRoomId] = useState<string>();

  const [device, setDevice] = useState<Device>();
  const [socket, setSocket] = useState<CustomSocket | null>(null);
  const [curProducer, setCurProducer] = useState<Producer>();
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const consumeProducers = async (producers: ProducerList[]) => {
    const consumePromises = producers.map((producer) => {
      const { producer_id } = producer;
      return consume(producer_id).catch((error) =>
        console.error(`Error while consuming producer ${producer_id}:`, error),
      );
    });
    await Promise.all(consumePromises);
  };

  const enterRoom = async () => {
    if (!socket || !curRoomId || !curName) return;
    try {
      await createRoom(curRoomId);
      await join(curRoomId, curName);
      initSockets();
    } catch (error) {
      console.error('Error in creating or joining the room:', error);
    }
  };

  const connect = async () => {
    if (!curName || !curRoomId) return;
    const socketConnection: CustomSocket = await io(MEDIA_SERVER_URL!, {
      transports: ['websocket'],
      path: '/server',
    });
    socketConnection.request = await socketPromise(socketConnection);
    setSocket(socketConnection);
    console.log('1. socket connect', socketConnection);
  };

  const createRoom = async (room_id: string) => {
    if (!socket || !socket.request) return;
    try {
      await socket.request('createRoom', {
        room_id,
      });
    } catch (err) {
      console.error('Create room error:', err);
    }
    console.log('1-1. createRoom');
  };

  const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    let curDevice;
    try {
      curDevice = new Device();
      await curDevice.load({ routerRtpCapabilities });
      setDevice(curDevice);
      console.log('3. device 로딩 ', curDevice);
    } catch (error) {
      if (error instanceof UnsupportedError) {
        console.error('Browser not supported');
      } else {
        console.error(error);
      }
      return null;
    }
    return curDevice;
  };

  const join = async (room_id: string, name: string) => {
    if (!socket || !socket.request) return;
    try {
      const socketJoin = await socket.request('join', {
        room_id,
        name,
      });
      console.log('2. Joined to room', socketJoin);

      const data = await socket.request('getRouterRtpCapabilities');
      await loadDevice(data);

      if (device) {
        socket.emit('getProducers');
      }
    } catch (err) {
      console.log('Join error:', err);
    }
  };

  const initSockets = async () => {
    if (!socket || !curName) return;

    await produce('screenType', curName);
    socket.emit('getOriginProducers');

    socket.on('existedProducers', async (data: any) => {
      console.log('4-1. existedProducers (consumeList)', data);
      const formatData = data.slice(0, -1);
      await consumeProducers(formatData);
    });
    socket.on('newProducers', async (data: any) => {
      console.log('4. New producers (consumeList)', data);
      await consumeProducers(data);
    });
    // socket.on('consumerClosed', ({ curConsumerId }) => {
    //   console.log('Closing consumer:', curConsumerId);
    //   removeConsumer(curConsumerId);
    // });
    socket.on('disconnect', () => {
      router.push('/webrtcroom');
    });
  };

  const createTransport = async (
    device: Device,
    direction: 'produce' | 'consume',
  ): Promise<Transport> => {
    if (!socket || !socket.request) throw new Error('Socket not initialized');

    const data = await socket.request('createWebRtcTransport', {
      forceTcp: false,
      rtpCapabilities:
        direction === 'produce' ? device.rtpCapabilities : undefined,
    });
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    }

    const transport =
      direction === 'produce'
        ? device.createSendTransport(data)
        : device.createRecvTransport(data);

    transport.on('connect', async ({ dtlsParameters }, callback, errback) => {
      try {
        if (!socket.request) return;
        await socket.request('connectTransport', {
          transport_id: transport.id,
          dtlsParameters,
        });
        callback();
      } catch (err) {
        errback(err as Error);
      }
    });
    transport.on('connectionstatechange', (state) => {
      switch (state) {
        case 'connected':
          console.log(`${direction} transport connected`);
          break;
        case 'failed':
          console.log(`${direction} transport Error`);
          // transport.close();
          break;
        default:
          break;
      }
    });
    if (direction === 'produce') {
      transport.on(
        'produce',
        async ({ kind, rtpParameters }, callback, errback) => {
          try {
            if (!socket.request) return;
            const { producerId } = await socket.request('produce', {
              producerTransportId: transport.id,
              kind,
              rtpParameters,
            });
            callback({ id: producerId });
          } catch (err) {
            errback(err as Error);
          }
        },
      );
    }
    return transport;
  };

  const addStream = (newStream: MediaStream) => {
    setStreams((prevStreams) => [...prevStreams, newStream]);
  };

  const produce = async (type: MediaType, memberId: string): Promise<void> => {
    try {
      if (!device || !socket || !socket.request) return;

      let stream: MediaStream;
      if (type === 'screenType') {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: type === 'audioType',
          video: type === 'videoType',
        });
      }
      addStream(stream);

      const track =
        type === 'audioType'
          ? stream.getAudioTracks()[0]
          : stream.getVideoTracks()[0];

      const producerTransport = await createTransport(device, 'produce');

      const producer = await producerTransport.produce({ track });
      setCurProducer(producer);
      console.log(producer);

      producer.on('trackended', () => {
        closeProducer();
        console.log('Track ended');
      });

      console.log(`Producing ${type} for member: ${memberId}`);
    } catch (error) {
      console.error(`Error producing ${type}:`, error);
    }
  };

  const consume = async (producerId: string): Promise<void> => {
    try {
      if (!device || !socket || !socket.request) return;

      const consumerTransport = await createTransport(device, 'consume');
      const { rtpCapabilities } = device;

      const data = await socket.request('consume', {
        producerId,
        consumerTransportId: consumerTransport.id,
        rtpCapabilities,
      });
      const { id, kind, rtpParameters } = data;

      const consumer: Consumer = await consumerTransport.consume({
        id,
        producerId,
        kind,
        rtpParameters,
      });

      const stream = new MediaStream();
      stream.addTrack(consumer.track);

      // consumer.on('transportclose', () => {
      //   console.log('Consumer transport closed');
      // });
      console.log(`Consumed media from producerId: ${producerId}`);

      addStream(new MediaStream([consumer.track]));
    } catch (error) {
      console.error('Error consuming:', error);
    }
  };

  const closeProducer = () => {
    if (curProducer) {
      curProducer.close();
      setCurProducer(undefined);
    }
  };

  useEffect(() => {
    if (name && room_id) {
      console.log('name:', name, 'room_id:', room_id);
      setCurName(name as unknown as string);
      setRoomId(room_id as string);
    }
  }, [name, room_id]);
  useEffect(() => {
    if (curRoomId) connect();
  }, [curRoomId]);

  useEffect(() => {
    enterRoom();
  }, [socket, curRoomId, curName]);

  return (
    <StWebRTCContainerWrapper>
      <StMediaWrapper>
        {streams.map((stream) => (
          <RTCVideo
            key={stream.id}
            mediaStream={stream}
            isSelected={selectedVideo === stream.id}
            onClick={() =>
              setSelectedVideo(selectedVideo === stream.id ? null : stream.id)
            }
          />
        ))}
      </StMediaWrapper>
      <StUserWrapper>
        <button type="button" onClick={connect}>
          connect
        </button>
      </StUserWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCContainer;

const StWebRTCContainerWrapper = styled.main`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 5rem;
  box-sizing: border-box;
`;

const StUserWrapper = styled.section`
  width: 20%;

  & > p,
  button {
    margin-bottom: 5rem;
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
const StMediaWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  width: fit-content;
`;
