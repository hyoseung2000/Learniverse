import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { getInterestRoomLists, postInterests } from '@/apis/login';
import { StudyRoomInfo } from '@/types/studyroom';

import { StudyroomCard } from '../RoomCard';

const SignUp = () => {
  const [roomList, setRoomList] = useState<StudyRoomInfo[]>();
  // const [isSelected, setIsSelected] = useState(false);
  const [selectList, setSelectList] = useState<number[]>([]);

  const getInterestList = async () => {
    const list = await getInterestRoomLists();
    setRoomList(list);
  };

  const handleSelected = (roomId: number) => {
    // 선택해제
    if (selectList.includes(roomId)) {
      setSelectList(selectList.filter((pick) => pick !== roomId));
    } // 선택
    else if (selectList.length === 5) {
      alert('관심 스터디는 최대 5개까지 선택할 수 있어요.');
    } else {
      setSelectList((select) => [...select, roomId]);
    }
  };

  const handleInterest = async () => {
    const memberId = 7;
    console.log(selectList);
    if (selectList.length < 3 || selectList.length > 5) {
      alert('관심 스터디는 3-5개 입력해주세요.');
    } else {
      await postInterests(memberId, selectList);
    }
  };

  useEffect(() => {
    getInterestList();
  }, []);

  useEffect(() => {
    getInterestList();
  }, [selectList]);

  return (
    <StSignUpWrapper>
      <StTitleWrapper>
        <h1>관심 있는 스터디를 선택해주세요! (3~5개)</h1>
        <h1>유사한 스터디들을 추천해드릴게요.</h1>
      </StTitleWrapper>

      <StStudyroomListWrapper>
        {roomList &&
          roomList.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              isInterest
              isSelected={selectList.includes(room.roomId)}
              handleSelected={() => {
                handleSelected(room.roomId);
              }}
            />
          ))}
      </StStudyroomListWrapper>
      <StButton onClick={handleInterest}>선택 완료</StButton>
    </StSignUpWrapper>
  );
};

export default SignUp;

const StSignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: 4.7rem;
`;

const StTitleWrapper = styled.div`
  justify-content: center;
  text-align: center;
  align-items: center;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};
  }
`;

const StStudyroomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  max-width: 76.5rem;
  max-height: 42rem;

  margin-top: 3.4rem;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StButton = styled.button`
  width: 11.6rem;
  height: 3.4rem;
  margin-top: 2.8rem;
  margin-left: 65rem;

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Title5};

  background: linear-gradient(93deg, #9985fe 1%, #93cdfd 100%);
  box-shadow: 2.791367530822754px 4.88489294052124px 4.187050819396973px
    1.395683765411377px rgba(0, 0, 0, 0.15);
  border-radius: 6.5rem;
`;
