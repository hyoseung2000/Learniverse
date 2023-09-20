import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { getApplyRoomList, getLeaderRoomList } from '@/apis/roomList';
import useModal from '@/hooks/useModal';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';

import { ManageModal } from '../RoomCard/Modal';
import EditModal from '../RoomCard/Modal/EditModal';
import StudyroomCard from '../RoomCard/StudyroomCard';

interface MyPageStudyRoomListProps {
  isLeader?: boolean;
}
const MyPageStudyRoomList = ({ isLeader }: MyPageStudyRoomListProps) => {
  const [roomList, setRoomList] = useState<StudyRoomInfo[]>();
  const [roomId, setRoomId] = useState<number>(0);
  const manage = useModal();
  const edit = useModal();
  const memberId = useRecoilValue(memberIdState);

  const getAllRoom = async () => {
    let rooms: StudyRoomInfo[] = [];
    if (isLeader) {
      rooms = await getLeaderRoomList(memberId);
    } else {
      rooms = await getApplyRoomList(memberId);
    }
    setRoomList(rooms);
  };

  const handleManage = async (curRoomId: number) => {
    setRoomId(curRoomId);
    manage.toggle();
  };

  const handleEdit = async (curRoomId: number) => {
    setRoomId(curRoomId);
    edit.toggle();
  };

  useEffect(() => {
    getAllRoom();
  }, [isLeader]);

  return (
    <StMyPageWrapper>
      <StMyPageRoomListWrapper>
        {roomList &&
          roomList.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              roomType={isLeader ? 'leader' : 'apply'}
              handleManage={
                isLeader ? () => handleManage(room.roomId) : undefined
              }
              handleEdit={isLeader ? () => handleEdit(room.roomId) : undefined}
            />
          ))}
      </StMyPageRoomListWrapper>
      <StManageModalWrapper $showing={manage.isShowing}>
        <ManageModal
          roomId={roomId}
          isShowing={manage.isShowing}
          handleConfirm={manage.toggle}
          handleCancel={manage.toggle}
        />
      </StManageModalWrapper>
      <StEditModalWrapper $showing={edit.isShowing}>
        <EditModal
          roomId={roomId}
          isShowing={edit.isShowing}
          handleConfirm={edit.toggle}
          handleCancel={edit.toggle}
        />
      </StEditModalWrapper>
    </StMyPageWrapper>
  );
};

export default MyPageStudyRoomList;

const StMyPageWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

const StMyPageRoomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  max-width: 76.5rem;

  margin-top: 4.6rem;
  margin-bottom: 8rem;
`;

const StManageModalWrapper = styled.div<{ $showing: boolean }>`
  display: ${({ $showing }) => ($showing ? 'block' : 'none')};
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

const StEditModalWrapper = styled(StManageModalWrapper)``;
