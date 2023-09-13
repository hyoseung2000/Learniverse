/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
import { Device } from 'mediasoup-client';
import {
  Producer,
  RtpCapabilities,
  RtpParameters,
  Transport,
  UnsupportedError,
} from 'mediasoup-client/lib/types';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { styled } from 'styled-components';

import socketPromise from './socketPromise';

interface CustomSocket extends Socket {
  request?: (event: string, data?: any) => Promise<any>;
}

const WebRTCContainer = () => {
  const router = useRouter();
  const { memberId, coreTimeId } = router.query;
  const [curMemberId, setCurMemberId] = useState<string>();
  const [curCoreTimeId, setCurCoreTimeId] = useState<string>();

  const [device, setDevice] = useState<Device>();
  const [socket, setSocket] = useState<CustomSocket | null>(null);
  const [producer, setProducer] = useState<Producer>();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const initSockets = () => {
    if (!socket) return;
    socket.on('consumerClosed', ({ consumer_id }) => {
      console.log('Closing consumer:', consumer_id);
      socket.removeConsumer(consumer_id);
    });
    socket.on('newProducers', async (data) => {
      console.log('4. New producers (consumeList)', data);
      await produce('videoType', userName);

      for (const { producer_id } of data) {
        await consume(producer_id);
      }
    });

    socket.on('disconnect', () => {
      router.push('/webrtcroom');
    });
  };

  const connect = async () => {
    const socketConnection: CustomSocket = await io('https://0.0.0.0:8080/', {
      transports: ['websocket'],
      path: '/server',
    });
    socketConnection.request = socketPromise(socketConnection);
    setSocket(socketConnection);
    console.log('1. socket connect', socketConnection);

    try {
      if (!curMemberId || !curCoreTimeId) return;
      await createRoom(curCoreTimeId);
      await join(curMemberId, curCoreTimeId);
      initSockets();
    } catch (error) {
      console.error('Error in creating or joining the room:', error);
    }
  };

  const createRoom = async (coretimeId: string) => {
    if (!socket || !socket.request) return;
    try {
      await socket.request('createRoom', {
        coretimeId,
      });
    } catch (err) {
      console.error('Create room error:', err);
    }
  };

  const join = async (memberId: string, coreTimeId: string) => {
    if (!socket || !socket.request) return;
    console.log('join');
    try {
      const socketJoin = await socket.request('join', {
        memberId,
        coreTimeId,
      });
      console.log('2. Joined to room', socketJoin);

      const data = await socket.request('getRouterRtpCapabilities');
      const device = await loadDevice(data);
      console.log('3. device 로딩 ', device);

      if (device) {
        await initTransports(device);
        socket.emit('getProducers');
      }
    } catch (err) {
      console.log('Join error:', err);
    }
  };

  const loadDevice = async (routerRtpCapabilities: RtpCapabilities) => {
    let curDevice;
    try {
      curDevice = new Device();
      await curDevice.load({ routerRtpCapabilities });
      setDevice(curDevice);
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

  const createTransport = async (
    device: Device,
    direction: 'send' | 'recv',
  ): Promise<Transport> => {
    if (!socket || !socket.request) throw new Error('Socket not initialized');

    const data = await socket.request('createWebRtcTransport', {
      forceTcp: false,
      rtpCapabilities:
        direction === 'send' ? device.rtpCapabilities : undefined,
    });
    if (data.error) {
      console.error(data.error);
      throw new Error(data.error);
    }

    const transport = device.createSendTransport(data);

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
          transport.close();
          break;
        default:
          break;
      }
    });

    if (direction === 'send') {
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

  const initTransports = async (device: Device) => {
    try {
      const producerTransport = await createTransport(device, 'send');
      const consumerTransport = await createTransport(device, 'recv');
    } catch (err) {
      console.error('Failed to initialize transports:', err);
    }
  };

  useEffect(() => {
    if (memberId && coreTimeId) {
      console.log('memberId:', memberId[0], 'coreTimeId:', coreTimeId[0]);
      setCurMemberId(memberId[0]);
      setCurCoreTimeId(coreTimeId[0]);
    }
  }, [memberId, coreTimeId]);

  useEffect(() => {
    connect();
    const mediasoupDevice = new Device();
    setDevice(mediasoupDevice);
  }, []);

  const startScreenSharing = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  };

  return (
    <StWebRTCContainerWrapper>
      <StMediaWrapper>
        <button type="button" onClick={startScreenSharing}>
          Share Screen
        </button>
        <video ref={videoRef} autoPlay playsInline />
        {/* <StMedia /> */}
      </StMediaWrapper>
      <StUserWrapper>
        <p>접속자</p>
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

  & > p {
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

const StMedia = styled.div`
  width: 30rem;
  height: 20rem;

  background-color: ${({ theme }) => theme.colors.Gray4};
  border-radius: 1rem;
`;
