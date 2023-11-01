import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { memberIdState } from '@/recoil/atom';

interface WebRTCAudioProps {
  mediaStream: MediaStream | undefined;
  memberId: number;
  ismuted: boolean;
}

const WebRTCAudio = ({ mediaStream, memberId, ismuted }: WebRTCAudioProps) => {
  const curMemberId = useRecoilValue(memberIdState);
  const viewRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!viewRef.current) return;
    viewRef.current.srcObject = mediaStream || null;
  }, [mediaStream]);

  return (
    <StAudioWrapper>
      <StAudio
        ref={viewRef}
        autoPlay
        muted={ismuted || curMemberId === memberId}
      />
    </StAudioWrapper>
  );
};

export default WebRTCAudio;

const StAudioWrapper = styled.div`
  display: none;
`;

const StAudio = styled.audio``;
