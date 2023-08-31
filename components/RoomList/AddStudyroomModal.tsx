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
  const [category, setCategory] = useState('기타');
  const [member, setMember] = useState(2);
  const [introduction, setIntroduction] = useState(5);

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

          <StCategory>
            <label>카테고리</label>
            <select
              value={category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setCategory(e.target.value);
              }}
            >
              <option value="5">기타</option>
              <option value="0">코딩테스트 대비</option>
              <option value="1">사이드 프로젝트</option>
              <option value="2">취업 준비</option>
              <option value="3">개발 공부</option>
              <option value="4">그룹/모임</option>
            </select>
          </StCategory>

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
                setIntroduction(Number(e.target.value));
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

const StCategory = styled(StInputStudyName)`
  & > select {
    width: 16.5rem;
    height: 3.2rem;
    padding-left: 1rem;

    border: none;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.White};
    background-color: ${({ theme }) => theme.colors.Purple4};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StMember = styled(StInputStudyName)`
  & > div {
    float: left;

    ${({ theme }) => theme.fonts.Title4};
    color: ${({ theme }) => theme.colors.Learniverse_BG};

    & > input {
      width: 5.1rem;
      margin-right: 0.6rem;
    }
  }
`;

const StIntro = styled(StInputStudyName)``;
