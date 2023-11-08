import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

// import { getIssueList } from '@/apis/issue';
import { useModal } from '@/hooks/Common';
import useGetIssueList from '@/hooks/StudyRooms/useGetIssueList';
import { IcPlusBtn } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';
import { IssueInfo } from '@/types/studyroom';

import { DiscussIssueModal } from '../Coretime/Issue';
import CreateIssueModal from '../Coretime/Issue/CreateIssueModal';
import IssueCard from './IssueCard';

const Issue = () => {
  const cIssue = useModal();
  const discuss = useModal();

  const roomID = useRecoilValue(roomIdState);
  const [showClosed, setshowClosed] = useState(true);

  const { issueList } = useGetIssueList(roomID);

  const handleOpenIssue = () => {
    cIssue.toggle();
  };

  const handleOpenToggle = () => {
    setshowClosed(true);
  };

  const handleCloseToggle = () => {
    setshowClosed(false);
  };

  const handleDiscuss = () => {
    discuss.toggle();
  };

  return (
    <>
      <StIsuueWrapper>
        <StTitleWrapper>
          <h2>이슈</h2>
          <button
            type="button"
            className={showClosed ? 'active' : ''}
            onClick={handleOpenToggle}
          >
            OPEN
          </button>
          <button
            type="button"
            className={showClosed ? '' : 'active'}
            onClick={handleCloseToggle}
          >
            CLOSED
          </button>
          <IcPlusBtn type="button" onClick={handleOpenIssue} />
        </StTitleWrapper>
        <StIssue>
          {issueList &&
            issueList.map(
              (issue: IssueInfo) =>
                showClosed === issue.issueOpen && (
                  <IssueCard
                    core={false}
                    key={issue.issueId}
                    handleDiscuss={handleDiscuss}
                    issueInfo={issue}
                  />
                ),
            )}
        </StIssue>
      </StIsuueWrapper>
      <StCreateIssueModalWrapper $showing={cIssue.isShowing}>
        <CreateIssueModal
          isShowing={cIssue.isShowing}
          handleCancel={cIssue.toggle}
        />
      </StCreateIssueModalWrapper>
      <StDiscussIssueModalWrapper $showing={discuss.isShowing}>
        <DiscussIssueModal
          isShowing={discuss.isShowing}
          handleCancel={discuss.toggle}
        />
      </StDiscussIssueModalWrapper>
    </>
  );
};

export default Issue;

const StTitleWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;

  & > button {
    display: flex;
    align-items: center;
    margin-left: 2rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body1};
  }

  & > .active {
    color: ${({ theme }) => theme.colors.Orange1};
  }

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Title1};
  }

  & > svg {
    position: absolute;
    right: 0rem;
    cursor: pointer;
  }
`;

const StIsuueWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 2rem 2.2rem 0 2.2rem;
`;

const StIssue = styled.div`
  display: flex;
  flex-direction: column;

  height: 19rem;
  margin-bottom: 1.4rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StCreateIssueModalWrapper = styled.div<{ $showing: boolean }>`
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

const StDiscussIssueModalWrapper = styled.div<{ $showing: boolean }>`
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
