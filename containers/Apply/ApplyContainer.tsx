import { useEffect } from 'react';
import { styled } from 'styled-components';

import { decodeRoomId } from '@/apis/studyroom';

interface ApplyContainerProps {
  url: string;
}

const ApplyContainer = ({ url }: ApplyContainerProps) => {
  console.log(url);

  const decodeId = async () => {
    const roomId = await decodeRoomId(url);
    console.log(roomId);
  };

  useEffect(() => {
    decodeId();
  }, [url]);

  return <StApplyContainer>{url}</StApplyContainer>;
};

export default ApplyContainer;

const StApplyContainer = styled.main``;
