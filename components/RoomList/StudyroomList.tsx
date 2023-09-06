import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getRoomList } from "@/apis/home";
import { studyRoomInfo, studyRoomListInfo } from "@/types/studyroom";

import AddStudyroom from "./AddStudyroom";
import StudyroomCard from "./StudyroomCard";

const StudyroomList = () => {
  const [roomList, setRoomList] = useState<studyRoomInfo[]>();

  const getAllRoom = async () => {
    const rooms = await getRoomList();
    setRoomList(rooms);
  };

  useEffect(() => {
    getAllRoom();
  }, []);

  return (
    <StStudyroomListWrapper>
      <AddStudyroom />
      {roomList &&
        roomList.map((room) => (
          <StudyroomCard key={room.roomId} roomData={room} />
        ))}
    </StStudyroomListWrapper>
  );
};

export default StudyroomList;

const StStudyroomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 8.4rem;
  margin-bottom: 8rem;
`;
