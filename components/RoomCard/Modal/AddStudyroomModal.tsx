import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { createRoom } from '@/apis/roomList';
import { IcAddTag, IcDeleteTag } from '@/public/assets/icons';
import { postStudyRoomInfo } from '@/types/studyroom';

import { CancelButton, ConfirmButton } from '../../Common/Button';
import { LargeModal } from '../../Common/Modal';

interface AddStudyroomModalProps {
  isShowing: boolean;
  handleCreate: () => void;
  handleCancel: () => void;
}

const AddStudyroomModal = ({
  isShowing,
  handleCreate,
  handleCancel,
}: AddStudyroomModalProps) => {
  const [studyName, setStudyName] = useState('');
  const [category, setCategory] = useState(5);
  const [hashtag, setHashtag] = useState('');
  const [hashtagList, setHashtagList] = useState<string[]>([]);
  const [member, setMember] = useState(2);
  const [introduction, setIntroduction] = useState('');
  const [addRoomInfo, setAddRoomInfo] = useState<postStudyRoomInfo>();

  const handleAddRoom = async () => {
    const url = addRoomInfo ? await createRoom(addRoomInfo) : '';
    console.log(url);
    handleCreate();
  };

  const handleHashtag = () => {
    if (hashtag) {
      setHashtagList((prev) => [...prev, hashtag]);
      setHashtag('');
    }
  };
  const handleRemoveHashtag = (index: number) => {
    setHashtagList((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setAddRoomInfo({
      member_id: 1,
      roomName: studyName,
      roomCategory: category,
      roomIntro: introduction,
      roomLimit: member,
      roomHashtags: hashtagList,
    });
  }, [studyName, category, hashtagList, member, introduction]);

  return (
    <>
      {isShowing && (
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
                  setCategory(parseInt(e.target.value));
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

            <StHashtag>
              <label>해시태그</label>
              <div>
                <input
                  type="text"
                  name="hashtag"
                  value={hashtag}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setHashtag(e.target.value);
                  }}
                  autoComplete="off"
                />
                <StAddTagBtn type="button" onClick={handleHashtag}>
                  <IcAddTag />
                </StAddTagBtn>
                <StHashtagList>
                  {hashtagList.map((tag, index) => (
                    <StHashtagItem key={index}>
                      # {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveHashtag(index)}
                      >
                        <IcDeleteTag />
                      </button>
                    </StHashtagItem>
                  ))}
                </StHashtagList>
              </div>
            </StHashtag>

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
      )}
    </>
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
    padding: 0 1rem;

    border: none;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.White};
    background-color: ${({ theme }) => theme.colors.Purple4};
    ${({ theme }) => theme.fonts.Title5};
  }
`;

const StHashtag = styled(StInputStudyName)`
  position: relative;

  & > div {
    max-width: 35.5rem;
  }
  & > div > input {
    width: 16.5rem;
  }
`;

const StAddTagBtn = styled.button`
  position: absolute;
  top: 1rem;
  left: 29rem;
`;

const StHashtagList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  margin-top: 0.5rem;
  margin-bottom: -0.5rem;
`;

const StHashtagItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  width: fit-content;
  height: 3.3rem;
  padding: 0 0.8rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;

  border-radius: 15rem;
  color: ${({ theme }) => theme.colors.Gray1};
  background-color: ${({ theme }) => theme.colors.Yellow2};
  ${({ theme }) => theme.fonts.Body3};

  & > button {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-left: 0.5rem;
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
