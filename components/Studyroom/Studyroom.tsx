import { useRouter } from 'next/router';
import { styled } from 'styled-components';

import CoreTimeSet from './CoreTimeSet';
import Issue from './Issue';
import MemberList from './MemberList';
import Notice from './Notice';
import WorkSpace from './Workspace';

const Studyroom = () => {
  return (
    <StStudyroomWrapper>
      <StTopWrapper>
        <StIssueWrapper>
          <Issue />
        </StIssueWrapper>
        <StWorkspaceWrapper>
          <WorkSpace />
        </StWorkspaceWrapper>
        <StMembersWrapper>
          <MemberList />
        </StMembersWrapper>
      </StTopWrapper>
      <StBottomWrapper>
        <StNoticeWrapper>
          <Notice />
        </StNoticeWrapper>
        <StCoretimeWrapper>
          <CoreTimeSet />
        </StCoretimeWrapper>
      </StBottomWrapper>
    </StStudyroomWrapper>
  );
};

export default Studyroom;

const StStudyroomWrapper = styled.main`
  grid-template-rows: 1fr 1fr;

  /* display: flex;
  justify-content: space-between; */

  width: 100%;
  padding: 1.5rem 6.5rem 0 6.5rem;
  box-sizing: border-box;
`;

const StTopWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const StBottomWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StIssueWrapper = styled.div`
  flex-grow: 3;
  margin: 1.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StWorkspaceWrapper = styled.div`
  flex-grow: 1;
  margin: 1.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StNoticeWrapper = styled.div`
  flex-grow: 5;
  margin: 1.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StMembersWrapper = styled.div`
  flex-grow: 4.5;
  margin: 1.4rem;

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

const StCoretimeWrapper = styled.div`
  flex-grow: 2;
  margin: 1.4rem;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }

  border-radius: 2rem;
  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );
`;

// const StStudyMainWrapper = styled.section`
//   width: 60%;

//   display: flex;
//   flex-direction: column;

//   padding-top: 2.588rem;
//   box-sizing: border-box;

//   & > h2 {
//     color: ${({ theme }) => theme.colors.White};
//     ${({ theme }) => theme.fonts.Head1};
//   }
// `;

// const StWorkspaceWrapper = styled.div`
//   padding-top: 2.3rem;

//   position: relative;

//   display: flex;
//   flex-direction: column;

//   & > h2 {
//     display: flex;
//     align-items: center;
//     gap: 4.4rem;

//     color: ${({ theme }) => theme.colors.White};
//     ${({ theme }) => theme.fonts.Head1};
//   }

//   & > svg {
//     position: absolute;
//     left: 25rem;
//     top: 0.4rem;
//   }

//   & > div {
//     padding-top: 2.3rem;

//     & > p {
//       color: ${({ theme }) => theme.colors.White};
//       ${({ theme }) => theme.fonts.Title5};
//     }
//   }
// `;

// const StBtnWrapper = styled.div`
//   position: relative;

//   display: flex;
//   justify-content: space-between;
// `;

// const StWorkSpace = styled.div`
//   display: flex;
//   align-items: center;
// `;
