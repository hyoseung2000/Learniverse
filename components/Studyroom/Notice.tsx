import { styled } from 'styled-components';

import { IcSend } from '@/public/assets/icons';

const Notice = () => {
  return (
    <StNoticeWrapper>
      <h1>스터디룸 공지</h1>
      <StComent>
        <h2>이번주 공지</h2>
        <p>이번주 코어타임 무조건 필참입니다!!!</p>
      </StComent>
      <StInput>
        <IcSend />
      </StInput>
    </StNoticeWrapper>
  );
};

export default Notice;

const StNoticeWrapper = styled.div`
  margin: 1.8rem 1.8rem 0 1.8rem;
  position: relative;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StComent = styled.div`
  padding: 1rem;
  margin-top: 2.4rem;

  border-radius: 1rem;

  & > h2 {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title3};
  }
  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
  }

  background: ${({ theme }) => theme.colors.LightGray2};
`;

const StInput = styled.div`
  width: 100%;
  height: 5rem;
  margin-top: 5rem;

  position: relative;

  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.LightGray2};

  & > svg {
    position: absolute;
    right: 1.3rem;
    bottom: 1.5rem;
  }
`;
