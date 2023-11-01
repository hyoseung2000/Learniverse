import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';
import { roomIdState } from '@/recoil/atom';

const StudyroomContainer = () => {
  const router = useRouter();
  const setRoomId = useSetRecoilState(roomIdState);

  useEffect(() => {
    const matched = router.asPath.match(/\/studyroom\/(\d+)/);
    if (matched && matched[1]) {
      setRoomId(Number(matched[1]));
    }
  }, [router.asPath]);

  return (
    <StStudyroomWrapper>
      <Studyroom />
    </StStudyroomWrapper>
  );
};

export default StudyroomContainer;

const StStudyroomWrapper = styled.main``;
