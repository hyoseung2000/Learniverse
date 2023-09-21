/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { Device } from 'mediasoup-client';
import {
  Consumer,
  RtpCapabilities,
  Transport,
  UnsupportedError,
} from 'mediasoup-client/lib/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  ChattingInfo,
  ConsumeInfo,
  ConsumerId,
  CustomSocket,
  JoinInfo,
  MediaType,
  PeersInfo,
  RoomInfo,
  RoomPeerInfo,
} from '@/types/socket';

import { addNickNameToPeer, getNickName } from './getNicknames';
import {
  handleConnectError,
  handleConsumerClosed,
  handleDisconnect,
  handleMessage,
  handleNewProducers,
} from './socketHandlers';

export const useWebRTC = (
  curRoomId: string,
  curName: string,
  socket: CustomSocket,
) => {
  const router = useRouter();

  const [curMembers, setCurMembers] = useState<RoomPeerInfo[]>([]);
  const [curDevice, setCurDevice] = useState<Device>();
  const [curProducer, setCurProducer] = useState<string>();
  const [curPeerList, setCurPeerList] = useState<PeersInfo[]>([]);

  const [videoStreams, setVideoStreams] = useState<ConsumeInfo[]>([]);
  const [audioStreams, setAudioStreams] = useState<ConsumeInfo[]>([]);
  const [chattingList, setChattingList] = useState<ChattingInfo[]>([]);

  const createRoom = async (roomId: string) => {
    if (!socket || !socket.request) return;
    try {
      await socket.request('createRoom', {
        room_id: roomId,
      });
    } catch (err) {
      console.error('Create room error:', err);
    }
    console.log('1-1. createRoom');
  };

  const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    let device;
    try {
      device = new Device();
      await device.load({ routerRtpCapabilities });
      setCurDevice(device);
      console.log('3. device 로딩 ', device);
    } catch (error) {
      if (error instanceof UnsupportedError) {
        console.error('Browser not supported');
      } else {
        console.error(error);
      }
      return null;
    }
    return device;
  };

  const join = async (roomId: string, nickName: string) => {
    if (!socket || !socket.request) return;
    try {
      const socketJoin: JoinInfo = await socket.request('join', {
        room_id: roomId,
        name: nickName,
      });
      console.log('2. Joined to room', socketJoin);

      const data = await socket.request('getRouterRtpCapabilities');
      await loadDevice(data);

      if (curDevice) {
        socket.emit('getProducers');
      }
    } catch (err) {
      console.error('Join error:', err);
    }
  };

  const enterRoom = async () => {
    if (!socket || !curRoomId || !curName) return;
    try {
      await createRoom(curRoomId);
      await join(curRoomId, curName);
    } catch (error) {
      console.error('Error in creating or joining the room:', error);
    }
  };

  const initSockets = async () => {
    if (!socket || !socket.request) return;

    await produce('screenType');
    await produce('audioType');

    const peerList: RoomInfo = await socket.request('getRoomInfo');
    console.log('4-1. peerList', peerList);
    setCurPeerList(peerList.peers);
    const formatData = peerList.peers.slice(0, -2);
    await consumeProducers(formatData);

    const peers: RoomPeerInfo[] = await socket.request('getRoomPeerInfo');
    console.log('4-1. getRoomPeerInfo', peers);
    const peersWithNickNames = await Promise.all(
      peers.map((peer) => addNickNameToPeer(peer)),
    );
    setCurMembers(peersWithNickNames);
  };

  const consumeProducers = async (producers: PeersInfo[]) => {
    const consumePromises = producers.map((producer) => {
      const { producer_id, produce_name, produce_type } = producer;
      return consume(producer_id, produce_name, produce_type).catch((error) =>
        console.error(`Error while consuming producer ${producer_id}:`, error),
      );
    });
    await Promise.all(consumePromises);
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
    if (direction === 'produce') {
      transport.on(
        'produce',
        async ({ kind, rtpParameters }, callback, errback) => {
          try {
            if (!socket.request) return;
            const producerId = await socket.request('produce', {
              producerTransportId: transport.id,
              kind,
              rtpParameters,
            });
            callback({ id: producerId.producer_id });
            setCurProducer(producerId.producer_id);
          } catch (err) {
            errback(err as Error);
          }
        },
      );
    }
    return transport;
  };

  const addStream = (
    newStream: MediaStream,
    nickname: string,
    producerId: string,
    type: string,
  ) => {
    const curStream: ConsumeInfo = {
      nickname,
      producer_id: producerId,
      stream: newStream,
    };
    if (type === 'video')
      setVideoStreams((prevStreams) => [...prevStreams, curStream]);
    if (type === 'audio')
      setAudioStreams((prevStreams) => [...prevStreams, curStream]);
  };

  const produce = async (type: MediaType): Promise<void> => {
    try {
      if (!curDevice || !socket || !socket.request) return;

      let stream: MediaStream;
      const nickname = await getNickName(curName!);
      console.log(curName, nickname);
      if (type === 'screenType') {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        addStream(stream, nickname, socket.id, 'video'); // producer_id로 수정 필요
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        addStream(stream, nickname, socket.id, 'audio');
      }

      const track =
        type === 'audioType'
          ? stream.getAudioTracks()[0]
          : stream.getVideoTracks()[0];

      const producerTransport = await createTransport(curDevice, 'produce');
      const producer = await producerTransport.produce({ track });

      producer.on('trackended', () => {
        closeProducer();
      });
    } catch (error) {
      console.error(`Error producing ${type}:`, error);
    }
  };

  const consume = async (
    producerId: string,
    producerName: string,
    produceType: string,
  ): Promise<void> => {
    try {
      if (!curDevice || !socket || !socket.request) return;

      const consumerTransport = await createTransport(curDevice, 'consume');
      const { rtpCapabilities } = curDevice;

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

      const nickname = await getNickName(producerName);
      addStream(
        new MediaStream([consumer.track]),
        nickname,
        producerId,
        produceType,
      );

      // consumer.on('transportclose', () => {
      //   console.log('Consumer transport closed');
      // });
    } catch (error) {
      console.error('Error consuming:', error);
    }
  };

  const closeProducer = () => {
    // if (curProducer) {
    //   curProducer.close();
    //   setCurProducer(undefined);
    // }
  };

  const removeStream = (producer_id: string) => {
    const filteredAudioStreams: ConsumeInfo[] = audioStreams.filter(
      (stream) => stream.producer_id !== producer_id,
    );
    const filteredVideoStreams: ConsumeInfo[] = videoStreams.filter(
      (stream) => stream.producer_id !== producer_id,
    );
    setAudioStreams(filteredAudioStreams);
    setVideoStreams(filteredVideoStreams);
  };

  useEffect(() => {
    if (socket) {
      socket.on('connect_error', handleConnectError);
      socket.on('newProducers', (data: PeersInfo[]) =>
        handleNewProducers(data, consumeProducers, setCurMembers),
      );
      socket.on('message', (data: ChattingInfo) =>
        handleMessage(data, setChattingList),
      );
      socket.on('consumerClosed', (data: ConsumerId) =>
        handleConsumerClosed(data, removeStream),
      );
      socket.on('disconnect', () => handleDisconnect(router));
    }

    return () => {
      if (socket) {
        socket.off('connect_error', handleConnectError);
        socket.off('newProducers');
        socket.off('message');
        socket.off('consumerClosed');
        socket.off('disconnect');
      }
    };
  }, [socket]);

  useEffect(() => {
    enterRoom();
  }, [socket, curRoomId, curName]);

  useEffect(() => {
    initSockets();
  }, [curDevice]);

  return {
    curMembers,
    curDevice,
    curProducer,
    curPeerList,
    videoStreams,
    audioStreams,
    chattingList,
  };
};
