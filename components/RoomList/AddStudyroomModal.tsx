import { useState } from 'react';
import { styled } from 'styled-components';

import { CancelButton, ConfirmButton } from '../Common/Button';
import { LargeModal } from '../Common/Modal';

interface AddStudyroomModalProps {
  isShowing: boolean;
  handleCancel: () => void;
}

const AddStudyroomModal = ({
  isShowing,
  handleCancel,
}: AddStudyroomModalProps) => {
  const handleAddRoom = () => {};

  const [studyName, setStudyName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [member, setMember] = useState(2);

  return (
    isShowing && (
      <LargeModal title="스터디룸 만들기" isShowing={isShowing}>
        <StAddStudyroomModalWrapper>
          <StInputStudyName>
            <label>스터디명</label>
            <input
              type="text"
              name="studyName"
              value={studyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setStudyName(e.target.value);
              }}
              autoComplete="off"
            />
          </StInputStudyName>

          <StMember>
            <label>정원 (최대 5명)</label>
            <div>
              <input
                type="number"
                name="member"
                value={member}
                min={2}
                max={5}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setMember(parseInt(e.target.value));
                }}
                autoComplete="off"
              />
              명
            </div>
          </StMember>

          <StIntro>
            <label>한줄소개 (선택)</label>
            <input
              type="text"
              name="introduction"
              value={introduction}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setIntroduction(e.target.value);
              }}
              autoComplete="off"
            />
          </StIntro>

          <StBtnWrapper>
            <ConfirmButton btnName="만들기" onClick={handleAddRoom} />
            <CancelButton btnName="취소" onClick={handleCancel} />
          </StBtnWrapper>
        </StAddStudyroomModalWrapper>
      </LargeModal>
    )
  );
};

export default AddStudyroomModal;

const StAddStudyroomModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 2.3rem 4.6rem;
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const StInputStudyName = styled.div`
  display: flex;
  align-items: center;
  gap: 3.2rem;

  width: 100%;
  margin-bottom: 2.1rem;

  & > label {
    width: 12.2rem;
    ${({ theme }) => theme.fonts.Title4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};
  }
  & > input,
  & > div > input {
    width: 35.5rem;
    height: 3.2rem;
    padding-left: 1rem;
    box-sizing: border-box;

    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.White};
    background-color: ${({ theme }) => theme.colors.Purple4};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StMember = styled(StInputStudyName)`
  & > div {
    float: left;
    /* display: flex; */

    ${({ theme }) => theme.fonts.Title4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};

    & > input {
      width: 5.1rem;
      margin-right: 0.6rem;
    }
  }
`;

const StIntro = styled(StInputStudyName)``;
