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
        <CoreTimeSet />
        <StWorkspaceWrapper>
          <h2>
            워크 스페이스
            <IcPlusBtn />
          </h2>
          <StBtnWrapper>
            <NotnBtn />
            <GDriveBtn />
            <GithbBtn />
            <FigmaBtn />
            <CoreBtn btnName="코어타임 입장" handleClick={handleAttend} />
          </StBtnWrapper>
        </StWorkspaceWrapper>
      </StStudyMainWrapper>
      <Side chatName="스터디룸 게시판" />
    </StStudyroomWrapper>
  );
};

export default Studyroom;

const StStudyroomWrapper = styled.main`
  display: flex;
  width: 100%;
`;
const StStudyMainWrapper = styled.section`
  width: 65%;

  display: flex;
  flex-direction: column;

  padding-top: 2.588rem;
  padding-left: 11.2rem;
  box-sizing: border-box;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;

const StWorkspaceWrapper = styled.div`
  padding-top: 2.8rem;

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
    padding-top: 1.5rem;

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
