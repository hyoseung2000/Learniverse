import { styled } from 'styled-components';

import { IcGraylineLogo } from '@/public/assets/icons';

import { StateBtn } from '../Common/Button';

const CoreTimeSet = () => {
  return (
    <StCoretimeWrapper>
      <h1>코어타임</h1>
      <StCoretableWrapper>
        <div>
          <p>8월 27일</p>
          <p>17:00 - 19:00</p>
          <StateBtn btnName="진행중" />
        </div>
        <IcGraylineLogo />
        <div>
          <p>9월 7일</p>
          <p>13:00 - 19:00</p>
          <StateBtn btnName="삭제" />
        </div>
        <IcGraylineLogo />
      </StCoretableWrapper>
    </StCoretimeWrapper>
  );
};

export default CoreTimeSet;

const StCoretimeWrapper = styled.div`
  margin-top: 0.4rem;

  display: flex;
  flex-direction: column;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StCoretableWrapper = styled.div`
  width: 49.2rem;
  height: 11rem;

  margin-top: 1.2rem;
  margin-bottom: 1.2rem;

  display: flex;
  flex-direction: column;

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

  background: ${({ theme }) => theme.colors.LightGray2};
  border-radius: 1.2rem;
`;
