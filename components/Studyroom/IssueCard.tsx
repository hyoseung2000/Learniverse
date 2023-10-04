import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IcIssueLogo } from '@/public/assets/icons';
import { issueIdState } from '@/recoil/atom';
import { IssueInfo } from '@/types/studyroom';

interface Props {
  core: boolean;
  handleDiscuss: () => void;
  issueInfo: IssueInfo;
}

const IssueCard = ({ core, handleDiscuss, issueInfo }: Props) => {
  const { issueId, issueTitle, issueDescription } = issueInfo;
  const setIssueID = useSetRecoilState(issueIdState);
  return (
    <StIssueWrapper>
      <div>
        <IcIssueLogo
          type="button"
          onClick={() => {
            setIssueID(issueId);
            handleDiscuss();
          }}
        />
        <StContent $core={core}>
          <h3>{issueTitle}</h3>
          <p>{issueDescription}</p>
        </StContent>
      </div>
      <hr />
    </StIssueWrapper>
  );
};

export default IssueCard;

const StIssueWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  margin-top: 2rem;
  margin-bottom: 1.4rem;

  & > div {
    display: flex;
    width: 100%;
  }

  & > div > svg {
    cursor: pointer;
  }

  & > hr {
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.White};
  }
`;

const StContent = styled.div<{ $core: boolean }>`
  & > h3 {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ $core }) => ($core ? '#1E1F3B' : '#FFFFFF')};
    ${({ theme }) => theme.fonts.Title5};
  }
  & > p {
    margin-left: 2.1rem;
    margin-top: 0.4rem;

    color: ${({ $core }) => ($core ? '#1E1F3B' : '#FFFFFF')};
    ${({ theme }) => theme.fonts.Body3};
  }
`;
