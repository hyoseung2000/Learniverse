/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/media-has-caption */
import { Device } from 'mediasoup-client';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { styled } from 'styled-components';

const WebRTCContainer = () => {
  const router = useRouter();
  const { memberId, coreTimeId } = router.query;
  const [curMemberId, setCurMemberId] = useState<string>();
  const [curCoreTimeId, setCurCoreTimeId] = useState<string>();

  const [device, setDevice] = useState<Device | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const connect = async () => {
    const socketConnection = await io('https://0.0.0.0:8080/', {
      transports: ['websocket'],
      path: '/server',
    });
    setSocket(socketConnection);
    console.log('1. socket 연결됨', socketConnection);
  };

  const join = async (name, room_id) => {
    socket
      .request('join', {
        name,
        room_id,
      })
      .then(async function (e) {
        console.log('2. Joined to room', e);
        const data = await socket.request('getRouterRtpCapabilities');
        device = await loadDevice(data);
        console.log('3. device 로딩 ', device);
        // device = device;
        await initTransports(device);
        socket.emit('getProducers');
      })
      .catch((err) => {
        console.log('Join error:', err);
      });
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
