/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { IcPlusBtn } from '@/public/assets/icons';

import { CoreBtn, StateBtn, StateDeleteBtn } from '../Common/Button';
import CreateCoretimeModal from './Modal/CreateCoretimeModal';

const CoreTimeSet = () => {
  const router = useRouter();
  const room_id = 'room1';

  const create = useModal();

  const handleOpen = () => {
    create.toggle();
  };

  const handleAttend = () => {
    router.push({
      pathname: '/coretime',
      query: { room_id },
    });
  };

  const handleDelete = () => {
    console.log('코어타임 삭제 구현');
  };

  return (
    <>
      <StCoretimeWrapper>
        <StTitleWrapper>
          <h1>코어타임</h1>
          <IcPlusBtn type="button" onClick={handleOpen} />
        </StTitleWrapper>
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
            <StateDeleteBtn btnName="삭제" handleClick={handleDelete} />
          </div>
        </StCoretableWrapper>
        <CoreBtn btnName="코어타임 입장하기" handleClick={handleAttend} />
      </StCoretimeWrapper>
      <StCreateModalWrapper $showing={create.isShowing}>
        <CreateCoretimeModal
          isShowing={create.isShowing}
          handleCancel={create.toggle}
        />
      </StCreateModalWrapper>
    </>
  );
};

export default CoreTimeSet;

const StCoretimeWrapper = styled.div`
  margin: 3.3rem;

  display: flex;
  flex-direction: column;
`;
const StTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }

  cursor: pointer;
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

const StCreateModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
