/* eslint-disable eqeqeq */
// import { Range } from 'ace-builds';
import { useEffect, useState } from 'react';
// import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

import { ModifyIssueDiscuss } from '@/apis/issue';
import { IcChar } from '@/public/assets/icons';
import { roomIdState } from '@/recoil/atom';
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
    memberId,
    issueOpinion,
    issueOpinionStartLine,
    issueOpinionEndLine,
    issueOpinionCode,
    issueAccepted,
  } = commentInfo;
  // const cMemberId = useRecoilValue(memberIdState);
  const roomId = useRecoilValue(roomIdState);
  const [memberNickname, setMemberNickname] = useState('');
  const [modifyData, setModifyData] = useState<ModifyDiscussInfo>();

  const setNickname = async (): Promise<void> => {
    const nickname = await getNickName(memberId);
    setMemberNickname(nickname);
  };

  const handleModify = async () => {
    // if (coderef) {
    //   console.log(coderef.getValue());
    //   const modifyRange = new Range(
    //     issueOpinionStartLine,
    //     0,
    //     issueOpinionEndLine,
    //     Infinity,
    //   );
    //   coderef.session.replace(modifyRange, issueOpinionCode);
    //   const changes = coderef.getValue();
    // const modifyRange = new Range(1, 0, 2, Infinity);
    // coderef.executeEdits('new', [
    //   { identifier: 'new', range: modifyRange, text: 'import axios' },
    // ]);

    const text = coderef.getValue();
    const splitedText = text.split('\n');
    const lines = issueOpinionEndLine - issueOpinionStartLine + 1;
    console.log(issueOpinionCode);
    splitedText.splice(issueOpinionStartLine - 1, lines, issueOpinionCode);

    console.log('split', splitedText);

    // const textToInsert = '// test'; // text to be inserted

    // splitedText[0] = [textToInsert];

    // coderef.setValue(splitedText.join('\n'));
    coderef.setValue(splitedText.join('\n'));

    const changes: string = coderef.getValue();

    console.log('수정', changes);

    setModifyData({
      issueId,
      roomId,
      gitCodeModify: changes,
    });

    console.log(modifyData);
    await ModifyIssueDiscuss(modifyData!);
    mutate(`/room/issue?issueId=${issueId}`);
    mutate(`room/discussions?issueId=${issueId}`);
  };

  useEffect(() => {
    setNickname();
  }, []);

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
      {!issueAccepted ? (
        <StButton $isPersist onClick={handleModify}>
          수락
        </StButton>
      ) : (
        <StButton $isPersist={false}>불가</StButton>
      )}
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
