/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

interface RTCVideoProps {
  mediaStream: MediaStream | undefined;
  isSelected: boolean;
  onClick: () => void;
}

const RTCVideo = ({ mediaStream, isSelected, onClick }: RTCVideoProps) => {
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

    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
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
      <button type="button" onClick={captureAndSaveVideoFrame}>
        Save Image
      </button>
    </>
  );
};

export default RTCVideo;

const StVideo = styled.video`
  min-width: 30rem;
  max-width: 30rem;
  min-height: 20rem;
  max-height: 20rem;

  background-color: ${({ theme }) => theme.colors.Gray4};
  border-radius: 1rem;
`;
