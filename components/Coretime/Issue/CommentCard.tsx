/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
// import { Range } from 'ace-builds';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { changeApplyState, modifyIssueDiscuss } from '@/apis/issue';
import { IcChar } from '@/public/assets/icons';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { DiscussInfo, ModifyDiscussInfo } from '@/types/studyroom';
import { getNickName } from '@/utils/getNicknames';
import { MonacoDiffEditor } from '@monaco-editor/react';

interface Props {
  commentInfo: DiscussInfo;
  modifyCode: string;
  coderef: MonacoDiffEditor;
  writer: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CommentCard = ({ commentInfo, coderef, modifyCode, writer }: Props) => {
  const {
    issueId,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    opinionId,
    memberId,
    issueOpinion,
    issueOpinionStartLine,
    issueOpinionEndLine,
    issueOpinionCode,
    issueAccepted,
  } = commentInfo;
  const cMemberId = useRecoilValue(memberIdState);
  const roomId = useRecoilValue(roomIdState);
  const [memberNickname, setMemberNickname] = useState('');
  const [modifyData, setModifyData] = useState<ModifyDiscussInfo>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [change, setChange] = useState('');

  const setNickname = async (): Promise<void> => {
    const nickname = await getNickName(memberId);
    setMemberNickname(nickname);
  };

  const handleModify = () => {
    coderef.updateOptions({ readOnly: false });
    const text = modifyCode;
    const splitedText = text.split('\n');
    const lines = issueOpinionEndLine - issueOpinionStartLine + 1;
    splitedText.splice(issueOpinionStartLine - 1, lines, issueOpinionCode);
    const joinText = splitedText?.join('\n');
    setChange(joinText);
  };

  const postDiscuss = async () => {
    if (change) {
      await modifyIssueDiscuss(modifyData!);
      await changeApplyState(opinionId);
      alert('제안된 코드가 수락되었습니다!');

      mutate(`/room/issue?issueId=${issueId}`);
      mutate(`room/discussions?issueId=${issueId}`);
    }
  };

  useEffect(() => {
    setModifyData({
      issueId,
      roomId,
      gitCodeModify: change,
    });
  }, [change]);

  useEffect(() => {
    if (change) {
      postDiscuss();
    }
  }, [modifyData]);

  useEffect(() => {
    setNickname();
  }, []);

  return (
    <StComment>
      <IcChar />
      <div>
        <h3>{memberNickname}</h3>
        {issueOpinionCode !== '' ? (
          <p>
            Line : {issueOpinionStartLine} - {issueOpinionEndLine}
          </p>
        ) : null}
        <p className="opinion">{issueOpinion}</p>
        <p className="code">{issueOpinionCode}</p>
      </div>
      {cMemberId == writer && issueOpinionCode ? (
        issueAccepted ? (
          <StButton $isPersist={false}>불가</StButton>
        ) : (
          <StButton $isPersist onClick={handleModify}>
            완료
          </StButton>
        )
      ) : null}
    </StComment>
  );
};

export default CommentCard;

const StComment = styled.div`
  margin-bottom: 1rem;
  position: relative;
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  height: fit-content;
  align-items: center;
  gap: 1rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.colors.LightGray2};

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 60%;
    flex-wrap: wrap;
    margin-right: 0.1rem;

    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
  }

  & > div > p {
    color: ${({ theme }) => theme.colors.Purple3};
    ${({ theme }) => theme.fonts.Body4};
  }

  & > div > .opinion {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body5};
  }
  & > div > .code {
    color: ${({ theme }) => theme.colors.Purple3};
    ${({ theme }) => theme.fonts.Body4};
  }
`;

const StButton = styled.button<{ $isPersist: boolean }>`
  width: 12%;
  height: 2.2rem;

  position: absolute;
  right: 1rem;

  border-radius: 0.6rem;

  ${({ theme }) => theme.fonts.Body6};
  background-color: ${({ $isPersist }) => ($isPersist ? '#0ACF84' : '#CFCED3')};
`;
