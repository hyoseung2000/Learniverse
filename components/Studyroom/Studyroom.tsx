import { styled } from 'styled-components';

import {
  IcChar,
  IcLine,
  IcLogo,
  IcPlusBtn,
  IcRoomLogo,
} from '@/public/assets/icons';

import {
  CoreBtn,
  FigmaBtn,
  GDriveBtn,
  GithbBtn,
  NotnBtn,
} from '../Common/Button';
import CoreTime from './CoreTime';
import Issue from './Issue';

const Studyroom = () => {
  return (
    <StStudyroomWrapper>
      <StStudyMainWrapper>
        <IcLogo />
        <h1>이슈</h1>
        <Issue />
        <CoreTime />
        <IcLine />
        <StWorkspaceWrapper>
          <h1>워크 스페이스</h1>
          <IcPlusBtn />
          <StBtnWrapper>
            <NotnBtn />
            <GDriveBtn />
            <GithbBtn />
            <FigmaBtn />
            <CoreBtn btnName="코어타임 입장" />
          </StBtnWrapper>
        </StWorkspaceWrapper>
      </StStudyMainWrapper>

      <StStudySideWrapper>
        <StRoomNameWrapper>
          <IcRoomLogo />
          <span>소웨5공주 공부방</span>
        </StRoomNameWrapper>
        <StMemberListWrapper>
          <p>현재 접속중</p>
          <IcChar />
        </StMemberListWrapper>
        <IcLine />
        <StChatWrapper>
          <p>스터디룸 채팅</p>
        </StChatWrapper>
      </StStudySideWrapper>
    </StStudyroomWrapper>
  );
};

export default Studyroom;

const StStudyroomWrapper = styled.main`
  display: flex;
  width: 100%;
`;
const StStudyMainWrapper = styled.div`
  width: 65%;

  display: flex;
  flex-direction: column;

  margin-top: 2.6rem;
  margin-left: 11.2rem;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StWorkspaceWrapper = styled.div`
  margin-top: 2.8rem;

  position: relative;

  display: flex;
  flex-direction: column;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }

  & > svg {
    position: absolute;
    left: 25rem;
    top: 0.4rem;
  }

  & > div {
    margin-top: 1.3rem;

    & > p {
      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Title5};
    }
  }
`;

const StBtnWrapper = styled.div`
  display: flex;
  position: relative;
`;

const StStudySideWrapper = styled.div`
  width: 35%;
  height: 76.8rem;

  margin-left: 3.1rem;

  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );

  & > svg {
    width: 100%;
  }
`;

const StRoomNameWrapper = styled.div`
  margin-left: 3.1rem;
  margin-top: 5.4rem;

  & > span {
    margin-left: 1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }
`;

const StMemberListWrapper = styled.div`
  margin-top: 3.3rem;

  & > p {
    margin-left: 3.1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;

const StChatWrapper = styled.div`
  margin-top: 1.2rem;

  & > p {
    margin-left: 3.1rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title3};
  }
`;
