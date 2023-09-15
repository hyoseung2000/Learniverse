import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import { IcPlusBtn } from '@/public/assets/icons';

import {
  CoreBtn,
  FigmaBtn,
  GDriveBtn,
  GithbBtn,
  NotnBtn,
} from '../Common/Button';
import { Side } from '../Side';
import CoreTimeSet from './CoreTimeSet';
import Issue from './Issue';

const Studyroom = () => {
  const router = useRouter();

  const handleAttend = () => {
    router.push('/coretime/1'); // TODO : coreitimeId 추가
  };

  return (
    <StStudyroomWrapper>
      <StStudyMainWrapper>
        <h2>이슈</h2>
        <Issue />
        <hr />
        <CoreTimeSet />
        <hr />
        <StWorkspaceWrapper>
          <h2>
            워크 스페이스
            <IcPlusBtn />
          </h2>
          <StBtnWrapper>
            <StWorkSpace>
              <NotnBtn />
              <GDriveBtn />
              <GithbBtn />
              <FigmaBtn />
            </StWorkSpace>
            <CoreBtn btnName="코어타임 입장" handleClick={handleAttend} />
          </StBtnWrapper>
        </StWorkspaceWrapper>
      </StStudyMainWrapper>
      <Side chatName="스터디룸 공지" />
    </StStudyroomWrapper>
  );
};

export default Studyroom;

const StStudyroomWrapper = styled.main`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 1.5rem 6.5rem 0 6.5rem;
  box-sizing: border-box;
`;
const StStudyMainWrapper = styled.section`
  width: 60%;

  display: flex;
  flex-direction: column;

  padding-top: 2.588rem;
  box-sizing: border-box;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StWorkspaceWrapper = styled.div`
  padding-top: 2.3rem;

  position: relative;

  display: flex;
  flex-direction: column;

  & > h2 {
    display: flex;
    align-items: center;
    gap: 4.4rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }

  & > svg {
    position: absolute;
    left: 25rem;
    top: 0.4rem;
  }

  & > div {
    padding-top: 2.3rem;

    & > p {
      color: ${({ theme }) => theme.colors.White};
      ${({ theme }) => theme.fonts.Title5};
    }
  }
`;

const StBtnWrapper = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
`;

const StWorkSpace = styled.div`
  display: flex;
  align-items: center;
`;
