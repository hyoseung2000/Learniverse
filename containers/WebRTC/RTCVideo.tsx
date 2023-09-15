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

  return (
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
