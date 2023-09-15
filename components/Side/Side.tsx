import { styled } from 'styled-components';

import { IcChar, IcLine, IcRoomLogo, IcSend } from '@/public/assets/icons';

interface Props {
  chatName: string;
}

const Side = ({ chatName }: Props) => {
  return (
    <StSideWrapper>
      <StRoomNameWrapper>
        <IcRoomLogo />
        <span>소웨5공주 공부방</span>
      </StRoomNameWrapper>
      <StMemberListWrapper>
        <p>현재 접속중</p>
        <StMemberWrapper>
          <IcChar />
          <div>
            <p>코딩천사 선영이</p>
            <p>졸프과제 하는 중</p>
          </div>
        </StMemberWrapper>
        <StMemberWrapper>
          <IcChar />
          <div>
            <p>코딩천사 선영이</p>
            <p>졸프과제 하는 중</p>
          </div>
        </StMemberWrapper>
        <StMemberWrapper>
          <IcChar />
          <div>
            <p>코딩천사 선영이</p>
            <p>졸프과제 하는 중</p>
          </div>
        </StMemberWrapper>
        <StMemberWrapper>
          <IcChar />
          <div>
            <p>코딩천사 선영이</p>
            <p>졸프과제 하는 중</p>
          </div>
        </StMemberWrapper>
        <StMemberWrapper>
          <IcChar />
          <div>
            <p>코딩천사 선영이</p>
            <p>졸프과제 하는 중</p>
          </div>
        </StMemberWrapper>
      </StMemberListWrapper>
      {/* <IcLine /> */}
      <StChatWrapper>
        <p>{chatName}</p>
        <StSendWrapper>
          <IcSend />
        </StSendWrapper>
      </StChatWrapper>
    </StSideWrapper>
  );
};

export default Side;

const StSideWrapper = styled.main``;

const StRoomNameWrapper = styled.div`
  box-sizing: border-box;
  padding-left: 3.1rem;
  padding-top: 5.4rem;

  & > span {
    padding-left: 1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StMemberListWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  padding-top: 3.3rem;

  & > p {
    padding-left: 3.1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StMemberWrapper = styled.div`
  box-sizing: border-box;
  display: flex;

  padding-top: 1.7rem;
  padding-left: 3.5rem;

  & > div {
    & > p {
      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Body2};
    }

    & > p :nth-child(2) {
      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Body4};
    }
  }
`;

const StChatWrapper = styled.div`
  box-sizing: border-box;
  padding-top: 1.2rem;

  & > p {
    padding-left: 3.1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StSendWrapper = styled.div`
  width: 33%;
  height: 3.6rem;

  position: absolute;
  bottom: 0rem;

  background: ${({ theme }) => theme.colors.White};

  & > svg {
    position: absolute;
    right: 1.3rem;
    bottom: 0.8rem;
  }
`;
