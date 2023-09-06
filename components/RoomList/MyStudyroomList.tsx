import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getMyRoomList } from "@/apis/home";
import { studyRoomInfo } from "@/types/studyroom";

import AddStudyroom from "../RoomCard/AddStudyroom";
import StudyroomCard from "../RoomCard/StudyroomCard";

const MyStudyroomList = () => {
  const [myRoomList, setMyRoomList] = useState<studyRoomInfo[]>();

  const getMyStudyRoom = async () => {
    const rooms = await getMyRoomList();
    setMyRoomList(rooms);
  };

  useEffect(() => {
    getMyStudyRoom();
  }, []);

  return (
    <StStudyroomListWrapper>
      <AddStudyroom />
      {myRoomList &&
        myRoomList.map((room) => (
          <StudyroomCard key={room.roomId} roomData={room} />
        ))}
    </StStudyroomListWrapper>
  );
};

export default MyStudyroomList;

const StStudyroomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 8.4rem;
  margin-bottom: 8rem;
`;
