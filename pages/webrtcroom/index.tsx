/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/media-has-caption */
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

const index = () => {
  const router = useRouter();
  const room_id = 'room1';

  const goCoretime = () => {
    router.push({
      pathname: '/webrtc',
      query: { room_id },
    });
  };

  return (
    <StWebRTCWrapper>
      <button type="button" onClick={goCoretime}>
        코어타임 접속하기
      </button>
    </StWebRTCWrapper>
  );
};

export default index;

const StWebRTCWrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  & > button {
    width: 20rem;
    height: 10rem;

    background-color: white;
  }
`;
