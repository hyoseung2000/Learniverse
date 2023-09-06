import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { getApplyRoomList, getLeaderRoomList } from "@/apis/roomList";
import useModal from "@/hooks/useModal";
import { studyRoomInfo } from "@/types/studyroom";

import { ManageModal } from "../RoomCard/Modal";
import StudyroomCard from "../RoomCard/StudyroomCard";

interface MyPageStudyRoomListProps {
  isLeader?: boolean;
}
const MyPageStudyRoomList = ({ isLeader }: MyPageStudyRoomListProps) => {
  const [roomList, setRoomList] = useState<studyRoomInfo[]>();
  const [roomId, setRoomId] = useState<number>(0);
  const manage = useModal();
  const edit = useModal();

  const getAllRoom = async () => {
    let rooms: studyRoomInfo[] = [];
    if (isLeader) {
      rooms = await getLeaderRoomList();
    } else {
      rooms = await getApplyRoomList();
    }
    setRoomList(rooms);
  };

  const handleManage = async (roomId: number) => {
    setRoomId(roomId);
    manage.toggle();
    // const members = awai
    // manage.setPayload(roomId);
  };

  const handleEdit = () => {};
  useEffect(() => {
    getAllRoom();
  }, [isLeader]);

  return (
    <>
      <StMyPageRoomListWrapper>
        {roomList &&
          roomList.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              roomType={isLeader ? 'leader' : 'apply'}
              handleManage={
                isLeader
                  ? () => {
                      handleManage(room.roomId);
                    }
                  : undefined
              }
              handleEdit={isLeader ? edit.toggle : undefined}
            />
          ))}
      </StMyPageRoomListWrapper>
      <StManageModalWrapper isShowing={manage.isShowing}>
        <ManageModal
          roomId={roomId}
          isShowing={manage.isShowing}
          handleConfirm={manage.toggle}
          handleCancel={manage.toggle}
        />
      </StManageModalWrapper>
    </>
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

const StManageModalWrapper = styled.div<{ isShowing: boolean }>`
  display: ${({ isShowing }) => (isShowing ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.5);
`;
