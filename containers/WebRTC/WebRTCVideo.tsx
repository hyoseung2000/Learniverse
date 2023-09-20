/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

import { IcCoreChar } from '@/public/assets/icons';

import { getPresignedUrl, putFile } from '../../apis/coretime';

interface WebRTCVideoProps {
  roomId: string;
  memberId: string;
  mediaStream: MediaStream | undefined;
  isSelected: boolean;
  onClick: () => void;
}

const WebRTCVideo = ({
  roomId,
  memberId,
  mediaStream,
  isSelected,
  onClick,
}: WebRTCVideoProps) => {
  const viewRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream || null;
  }, [mediaStream]);

  const captureAndSaveVideoFrame = () => {
    if (!viewRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = viewRef.current.videoWidth;
    canvas.height = viewRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx!.drawImage(viewRef.current, 0, 0, canvas.width, canvas.height);

    // 캔버스로부터 Data URL을 생성
    const imageURL = canvas.toDataURL('image/png');

    // Data URL을 Blob으로 변환
    const byteString = atob(imageURL.split(',')[1]);
    const mimeString = imageURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    const file = new File([blob], `${roomId}-${memberId}.png`, {
      type: mimeString,
    });

    // eslint-disable-next-line consistent-return
    return file; // 생성된 File 객체를 반환
  };

  const handleUploadImage = async () => {
    const capturedImage = captureAndSaveVideoFrame();
    const url = await getPresignedUrl();
    console.log(url);
    if (capturedImage) {
      await putFile(url, capturedImage);
    }
  };

  return (
    <StVideoWrapper>
      <StVideo
        ref={viewRef}
        onClick={onClick}
        style={{
          minWidth: isSelected ? '90rem' : '30rem',
          maxWidth: isSelected ? '90rem' : '30rem',
          minHeight: isSelected ? '60rem' : '20rem',
          maxHeight: isSelected ? '60rem' : '20rem',
        }}
        autoPlay
        playsInline
      />
      <IcCoreChar />
      <StName>{memberId}</StName>
      {/* <button type="button" onClick={handleUploadImage}>
        Save Image
      </button> */}
    </StVideoWrapper>
  );
};

export default WebRTCVideo;

const StVideoWrapper = styled.div`
  position: relative;
  display: flex;

  & > button {
    width: 60%;
    padding: 0.5rem 0;

    border-radius: 2rem;
    background-color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StVideo = styled.video`
  min-width: 30rem;
  max-width: 30rem;
  min-height: 20rem;
  max-height: 20rem;

  background-color: ${({ theme }) => theme.colors.Gray4};
  border-radius: 1rem;
`;

const StName = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: 1rem;

  display: flex;
  align-items: center;
  padding: 0 1.5rem 0 1rem;

  width: fit-content;
  height: 2rem;

  border-radius: 0 1rem 1rem 0;
  background-color: ${({ theme }) => theme.colors.Yellow2};
  ${({ theme }) => theme.fonts.Body4};
`;
