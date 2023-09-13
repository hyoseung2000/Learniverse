/* eslint-disable jsx-a11y/media-has-caption */
import { Device } from 'mediasoup-client';
import { useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { styled } from 'styled-components';

const WebRTCContainer = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const socketConnection = io('https://0.0.0.0:8080');
    setSocket(socketConnection);
    const mediasoupDevice = new Device();
    setDevice(mediasoupDevice);
    // Handle socket.io events and mediasoup client here
  }, []);

  const startScreenSharing = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
    });
    if (videoRef && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    // Use stream with mediasoup client to send to the server
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
