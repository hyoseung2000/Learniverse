import { Range } from 'ace-builds';
import { RefObject } from 'react';
import AceEditor from 'react-ace';
import { styled } from 'styled-components';

import { IcChar } from '@/public/assets/icons';

interface Props {
  coderef: RefObject<AceEditor>;
  code: string;
  index: number;
}

const CommentCard = ({ coderef, code, index }: Props) => {
  const isWriter = true;

  const handleModify = () => {
    if (coderef.current) {
      const modifyRange = new Range(index, 0, index, Infinity);
      coderef.current.editor.session.replace(modifyRange, code);
      const changes = coderef.current.editor.getValue();
      console.log(changes);
      // setCode(changes);
    }
  };

  return (
    <StComment>
      <IcChar />
      <div>
        <h3>유지니</h3>
        <p>난 이렇게 하니까 되던데?</p>
        <code>{code}</code>
      </div>
      {isWriter ? (
        <button type="button" onClick={handleModify}>
          반영
        </button>
      ) : (
        <button type="button" disabled>
          비활
        </button>
      )}
    </StComment>
  );
};

export default CommentCard;

const StComment = styled.div`
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

  & > button {
    width: 3.5rem;
    height: 2.2rem;

    position: absolute;
    right: 1rem;

    border-radius: 0.6rem;
    background-color: ${({ theme }) => theme.colors.Green};
    ${({ theme }) => theme.fonts.Body6};
  }
`;
