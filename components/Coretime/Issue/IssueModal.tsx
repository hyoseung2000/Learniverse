/* eslint-disable react/jsx-boolean-value */
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import IssueCard from '@/components/Studyroom/IssueCard';
import useGetIssueList from '@/hooks/StudyRooms/useGetIssueList';
import { roomIdState } from '@/recoil/atom';
import { IssueInfo } from '@/types/studyroom';

interface Props {
  isShowing: boolean;
  handleClick: () => void;
  handleCreate: () => void;
  handleCancel: () => void;
}

const IssueModal = ({
  isShowing,
  handleClick,
  handleCreate,
  handleCancel,
}: Props) => {
  const roomID = useRecoilValue(roomIdState);
  // const [issueList, setIssueList] = useState<IssueInfo[]>();
  const { issueList } = useGetIssueList(roomID);

  // const getIssues = async () => {
  //   const issueInfo = await getIssueList(roomID);

  //   setIssueList(issueInfo);
  // };

  const handleCreateIssue = () => {
    handleCreate();
  };

  // useEffect(() => {
  //   if (isShowing) getIssues();
  // }, [isShowing]);

  return (
    isShowing && (
      <LargeModal title="이슈 리스트" isShowing={isShowing}>
        <StIssueWrapper>
          <StIssue>
            {issueList &&
              issueList.map(
                (issue: IssueInfo) =>
                  issue.issueOpen && (
                    <IssueCard
                      core={true}
                      key={issue.issueId}
                      handleDiscuss={handleClick}
                      issueInfo={issue}
                    />
                  ),
              )}
          </StIssue>

          <StBtnWrapper>
            <ConfirmButton
              btnName="이슈 생성하기"
              onClick={handleCreateIssue}
            />
            <CancelButton
              btnName="취소"
              onClick={() => {
                handleCancel();
              }}
            />
          </StBtnWrapper>
        </StIssueWrapper>
      </LargeModal>
    )
  );
};

export default IssueModal;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.5rem 3.4rem 2.4rem 3.4rem;
  box-sizing: border-box;
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StIssue = styled.div`
  display: flex;
  flex-direction: column;
  height: 19rem;
  width: 100%;

  margin-top: 2rem;
  margin-bottom: 1.4rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
