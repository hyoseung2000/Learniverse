import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getApplyRoomList, getLeaderRoomList } from "@/apis/home";
import { studyRoomInfo } from "@/types/studyroom";

import StudyroomCard from "../RoomCard/StudyroomCard";

interface MyPageStudyRoomListProps {
  isLeader?: boolean;
}
const MyPageStudyRoomList = ({ isLeader }: MyPageStudyRoomListProps) => {
  const [roomList, setRoomList] = useState<studyRoomInfo[]>();

  const getAllRoom = async () => {
    let rooms: studyRoomInfo[] = [];
    if (isLeader) {
      rooms = await getLeaderRoomList();
    } else {
      rooms = await getApplyRoomList();
    }
    setRoomList(rooms);
  };

  useEffect(() => {
    getAllRoom();
  }, [isLeader]);

  return (
    <StMyPageRoomListWrapper>
      {roomList &&
        roomList.map((room) => (
          <StudyroomCard
            key={room.roomId}
            roomData={room}
            roomType={isLeader ? 'leader' : 'apply'}
          />
        ))}
    </StMyPageRoomListWrapper>
  );
};

export default MyPageStudyRoomList;

const StMyPageRoomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  margin-top: 4.6rem;
  margin-bottom: 8rem;
`;
