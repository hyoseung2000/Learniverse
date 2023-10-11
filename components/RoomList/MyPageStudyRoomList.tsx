import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { useModal } from '@/hooks/Common';
import {
  useGetApplyStudyRoomList,
  useGetLeaderStudyRoomList,
} from '@/hooks/StudyRooms';
import { IcCharacterCheck } from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';

import { ConfirmButton } from '../Common/Button';
import { ModalWrapper } from '../Common/Modal';
import SmallModal from '../Common/Modal/SmallModal';
import { ManageModal } from '../RoomCard/Modal';
import EditModal from '../RoomCard/Modal/EditModal';
import StudyroomCard from '../RoomCard/StudyroomCard';
import { StudyroomListSkeleton } from './Skeleton';

interface MyPageStudyRoomListProps {
  isLeader?: boolean;
}

const MyPageStudyRoomList = ({ isLeader }: MyPageStudyRoomListProps) => {
  const [roomList, setRoomList] = useState<StudyRoomInfo[]>();

  const [roomId, setRoomId] = useState<number>(0);
  const memberId = useRecoilValue(memberIdState);

  const { leaderStudyRoomList, isLeaderRoomLoading } =
    useGetLeaderStudyRoomList(memberId);
  const { applyStudyRoomList, isApplyRoomLoading } =
    useGetApplyStudyRoomList(memberId);

  const manage = useModal();
  const edit = useModal();
  const editConfirm = useModal();

  const getRoomList = () => {
    let rooms: StudyRoomInfo[] = [];
    if (isLeader) {
      rooms = leaderStudyRoomList || [];
    } else {
      rooms = applyStudyRoomList || [];
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
    getRoomList();
  }, [isLeader, leaderStudyRoomList, applyStudyRoomList]);

  return (
    <StMyPageWrapper>
      <StMyPageRoomListWrapper>
        {isLeaderRoomLoading || isApplyRoomLoading ? (
          <StudyroomListSkeleton />
        ) : (
          roomList?.map((room) => (
            <StudyroomCard
              key={room.roomId}
              roomData={room}
              roomType={isLeader ? 'leader' : 'apply'}
              handleManage={
                isLeader ? () => handleManage(room.roomId) : undefined
              }
              handleEdit={isLeader ? () => handleEdit(room.roomId) : undefined}
            />
          ))
        )}
      </StMyPageRoomListWrapper>

      <ModalWrapper isShowing={manage.isShowing}>
        <ManageModal
          roomId={roomId}
          isShowing={manage.isShowing}
          handleConfirm={manage.toggle}
          handleCancel={manage.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={edit.isShowing}>
        <EditModal
          roomId={roomId}
          isShowing={edit.isShowing}
          handleConfirm={() => {
            edit.toggle();
            editConfirm.toggle();
          }}
          handleCancel={edit.toggle}
        />
      </ModalWrapper>
      <ModalWrapper isShowing={editConfirm.isShowing}>
        <SmallModal
          title="스터디 정보 수정 완료"
          isShowing={editConfirm.isShowing}
        >
          <StSmallModalWrapper>
            <StContentWrapper>
              <IcCharacterCheck />
              <p>스터디 정보 수정이 완료되었어요.</p>
            </StContentWrapper>
            <ConfirmButton btnName="확인" onClick={editConfirm.toggle} />
          </StSmallModalWrapper>
        </SmallModal>
      </ModalWrapper>
    </StMyPageWrapper>
  );
};

export default MyPageStudyRoomList;

const StMyPageWrapper = styled.section`
  display: flex;
  justify-content: center;
`;

export const StMyPageRoomListWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  max-width: 76.5rem;

  margin-top: 4.6rem;
  margin-bottom: 8rem;
`;

const StSmallModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 1.6rem;
`;

const StContentWrapper = styled.div`
  display: flex;
  align-items: center;

  & > svg {
    margin-left: -3rem;
  }

  & > p {
    margin-top: 1rem;
    margin-left: -2rem;

    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
    font-size: 1.5rem;
  }
`;
