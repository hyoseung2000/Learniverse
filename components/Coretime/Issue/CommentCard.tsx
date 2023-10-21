/* eslint-disable eqeqeq */
import { Range } from 'ace-builds';
import { RefObject, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { ModifyIssueDiscuss } from '@/apis/issue';
import { IcChar } from '@/public/assets/icons';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { DiscussInfo, ModifyDiscussInfo } from '@/types/studyroom';
import { getNickName } from '@/utils/getNicknames';

interface Props {
  commentInfo: DiscussInfo;
  coderef: RefObject<AceEditor>;
  writer: number;
}

const CommentCard = ({ commentInfo, coderef, writer }: Props) => {
  const { issueId, memberId, issueOpinion, issueOpinionLine } = commentInfo;
  const cMemberId = useRecoilValue(memberIdState);
  const roomId = useRecoilValue(roomIdState);
  const [memberNickname, setMemberNickname] = useState('');
  const [modifyData, setModifyData] = useState<ModifyDiscussInfo>();

  const setNickname = async (): Promise<void> => {
    const nickname = await getNickName(memberId);
    setMemberNickname(nickname);
  };

  const handleModify = async () => {
    if (coderef.current) {
      const modifyRange = new Range(
        issueOpinionLine,
        0,
        issueOpinionLine,
        Infinity,
      );
      coderef.current.editor.session.replace(modifyRange, issueOpinion);
      const changes = coderef.current.editor.getValue();
      setModifyData({
        issueId,
        roomId,
        memberId,
        gitCode: changes,
      });
      await ModifyIssueDiscuss(modifyData!);
    }
  };

  useEffect(() => {
    setNickname();
  }, []);

  return (
    <StComment>
      <IcChar />
      <div>
        <h3>{memberNickname}</h3>
        {/* <p>{issueOpinion}</p> */}
        <p>Line : {issueOpinionLine + 1}</p>
        <pre>
          <code>{issueOpinion}</code>
        </pre>
      </div>

      {cMemberId == writer ? (
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
  width: 95%;
  height: fit-content;
  align-items: center;
  gap: 1rem;
  border-radius: 0.6rem;
  background-color: ${({ theme }) => theme.colors.LightGray2};

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex-wrap: wrap;
  }
  & > div > p {
    color: ${({ theme }) => theme.colors.Purple3};
    ${({ theme }) => theme.fonts.Body6};
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
