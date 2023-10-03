import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getMyRoomList } from '@/apis/roomList';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo, StudyRoomListInfo } from '@/types/studyroom';

import { PurpleButton } from '../Common/Button';
import AddStudyroom from '../RoomCard/AddStudyroom';
import StudyroomCard from '../RoomCard/StudyroomCard';

const MyStudyroomList = () => {
  const [pinnedRoomList, setPinnedRoomList] = useState<StudyRoomInfo[]>();
  const [myRoomList, setMyRoomList] = useState<StudyRoomInfo[]>();
  const router = useRouter();
  const memberId = useRecoilValue(memberIdState);
  const [pinChange, setPinChange] = useState(false);

  const getMyStudyRoom = async () => {
    const rooms: StudyRoomListInfo = await getMyRoomList(memberId);
    setPinnedRoomList(rooms.pinRooms);
    setMyRoomList(rooms.rooms);
  };

  useEffect(() => {
    getMyStudyRoom();
  }, [pinChange]);

  return (
    <StStudyroomListWrapper>
      <StHomeTitle>
        <h2>나의 스터디룸</h2>
        <PurpleButton
          btnName="🔍  스터디 검색하기"
          handleClick={() => {
            router.push('/search');
          }}
        />
      </StHomeTitle>
      <StStudyroomList>
        <AddStudyroom />
        {pinnedRoomList &&
          pinnedRoomList.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              isPinned
              setPinChange={setPinChange}
            />
          ))}
        {myRoomList &&
          myRoomList.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              isPinned={false}
              setPinChange={setPinChange}
            />
          ))}
      </StStudyroomList>
    </StStudyroomListWrapper>
  );
};

export default MyStudyroomList;

const StStudyroomListWrapper = styled.section`
  margin-top: 8.4rem;
`;

const StStudyroomList = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 2rem;
  margin-bottom: 8rem;
`;

const StHomeTitle = styled.div`
  display: flex;
  justify-content: space-between;

  & > h2 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head1};
  }
`;
