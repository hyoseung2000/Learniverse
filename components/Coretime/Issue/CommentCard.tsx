import { Range } from 'ace-builds';
import { RefObject, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

// import { StateBtn, StateDeleteBtn } from '@/components/Common/Button';
import { IcChar } from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { DiscussInfo } from '@/types/studyroom';
import { getNickName } from '@/utils/getNicknames';

interface Props {
  commentInfo: DiscussInfo;
  coderef: RefObject<AceEditor>;
  writer: number;
}

const CommentCard = ({ commentInfo, coderef, writer }: Props) => {
  const { memberId, issueOpinion, issueOpinionLine } = commentInfo;
  const cMemberId = useRecoilValue(memberIdState);
  const [memberNickname, setMemberNickname] = useState('');

  const setNickname = async (): Promise<void> => {
    const nickname = await getNickName(memberId);
    setMemberNickname(nickname);
  };

  const handleModify = () => {
    if (coderef.current) {
      const modifyRange = new Range(
        issueOpinionLine,
        0,
        issueOpinionLine,
        Infinity,
      );
      coderef.current.editor.session.replace(modifyRange, issueOpinion);
      const changes = coderef.current.editor.getValue();
      console.log(changes);
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

      {
        // eslint-disable-next-line eqeqeq
        cMemberId == writer ? (
          // eslint-disable-next-line react/jsx-boolean-value
          <StButton $isPersist={true} onClick={handleModify}>
            수락
          </StButton>
        ) : (
          <StButton $isPersist={false}>거절</StButton>
        )
      }
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
