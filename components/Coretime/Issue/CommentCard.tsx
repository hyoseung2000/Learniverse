/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
// import { Range } from 'ace-builds';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

import { changeApplyState, modifyIssueDiscuss } from '@/apis/issue';
import { IcChar } from '@/public/assets/icons';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { DiscussInfo, ModifyDiscussInfo } from '@/types/studyroom';
import { getNickName } from '@/utils/getNicknames';
import { MonacoDiffEditor } from '@monaco-editor/react';

interface Props {
  commentInfo: DiscussInfo;
  coderef: MonacoDiffEditor;
  writer: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CommentCard = ({ commentInfo, coderef, writer }: Props) => {
  const {
    issueId,
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
  const [change, setChange] = useState<string>('');

  const setNickname = async (): Promise<void> => {
    const nickname = await getNickName(memberId);
    setMemberNickname(nickname);
  };

  const handleModify = async () => {
    coderef.updateOptions({ readOnly: false });
    const text = coderef?.getModifiedEditor().getValue();
    const splitedText = text.split('\n');
    const lines = issueOpinionEndLine - issueOpinionStartLine + 1;
    splitedText.splice(issueOpinionStartLine - 1, lines, issueOpinionCode);
    coderef?.getModifiedEditor().setValue(splitedText.join('\n'));

    const changes: string = coderef?.getModifiedEditor().getValue();

    setChange(changes);

    await modifyIssueDiscuss(modifyData!);
    await changeApplyState(opinionId);
    mutate(`/room/issue?issueId=${issueId}`);
    mutate(`room/discussions?issueId=${issueId}`);
  };

  useEffect(() => {
    setNickname();
  }, []);

  useEffect(() => {
    setModifyData({
      issueId,
      roomId,
      gitCodeModify: change,
    });
  }, [change]);

  return (
    <StComment>
      <IcChar />
      <div>
        <h3>{memberNickname}</h3>
        <p>
          Line : {issueOpinionStartLine} - {issueOpinionEndLine}
        </p>
        <p className="code">{issueOpinion}</p>
        <p>{issueOpinionCode}</p>
        {/* <pre>
          <code>{issueOpinion}</code>
        </pre> */}
      </div>

      {/* {cMemberId == writer ? (
        <StButton $isPersist onClick={handleModify}>
          수락
        </StButton>
      ) : (
        <StButton $isPersist={false}>불가</StButton>
      )} */}
      {cMemberId == writer ? (
        issueAccepted ? (
          <StButton $isPersist={false}>불가</StButton>
        ) : (
          <StButton $isPersist onClick={handleModify}>
            수락
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
    max-width: 80%;
    flex-wrap: wrap;
  }

  & > div > p {
    color: ${({ theme }) => theme.colors.Purple3};
    ${({ theme }) => theme.fonts.Body6};
  }

  & > div > .code {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Body7};
  }
`;

const StButton = styled.button<{ $isPersist: boolean }>`
  width: 3.5rem;
  height: 2.2rem;

  position: absolute;
  right: 1rem;

  border-radius: 0.6rem;

  ${({ theme }) => theme.fonts.Body6};
  background-color: ${({ $isPersist }) => ($isPersist ? '#0ACF84' : '#CFCED3')};
`;
