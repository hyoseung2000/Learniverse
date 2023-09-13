import { styled } from 'styled-components';

import { IcLine, IcLogo, IcPlusBtn } from '@/public/assets/icons';

import {
  CoreBtn,
  FigmaBtn,
  GDriveBtn,
  GithbBtn,
  NotnBtn,
} from '../Common/Button';
import { Side } from '../Side';
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
        <Side />
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
