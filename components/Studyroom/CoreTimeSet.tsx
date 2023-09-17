
/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import { CoreBtn, StateBtn, StateDeleteBtn } from '../Common/Button';

const CoreTimeSet = () => {
  const router = useRouter();
  const room_id = 'room1';

  const handleAttend = () => {
    router.push({
      pathname: '/coretime',
      query: { room_id },
    });
  };

  return (
    <StCoretimeWrapper>
      <h1>코어타임</h1>
      <StCoretableWrapper>
        <div>
          <p>8월 27일</p>
          <p>17:00 - 19:00</p>
          <StateBtn btnName="진행중" />
        </div>
        <hr />
        <div>
          <p>9월 7일</p>
          <p>13:00 - 19:00</p>
          <StateDeleteBtn btnName="삭제" />
        </div>
      </StCoretableWrapper>
      <CoreBtn btnName="코어타임 입장하기" handleClick={handleAttend} />
    </StCoretimeWrapper>
  );
};

export default CoreTimeSet;

const StCoretimeWrapper = styled.div`
  margin: 1.8rem;

  display: flex;
  flex-direction: column;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StCoretableWrapper = styled.div`
  width: 100%;

  margin: 2.3rem 0 4rem 0;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.LightGray2};
  border-radius: 1.2rem;

  & > div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    margin-top: 0.6rem;
    margin-bottom: 0.6rem;

    & > p {
      color: ${({ theme }) => theme.colors.Learniverse_BG};
      ${({ theme }) => theme.fonts.Title5};
    }
  }
  & > hr {
    border-color: ${({ theme }) => theme.colors.Gray3};
  }
`;
