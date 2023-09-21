import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { applyRoom, decodeRoomId, getRoomInfo } from '@/apis/studyroom';
import { CancelButton, ConfirmButton } from '@/components/Common/Button';
import { LargeModal, SmallModal } from '@/components/Common/Modal';
import { StudyroomCard } from '@/components/RoomCard';
import useModal from '@/hooks/useModal';
import { IcCharacterCheck } from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';

interface ApplyContainerProps {
  url: string;
}

const ApplyContainer = ({ url }: ApplyContainerProps) => {
  const router = useRouter();
  const [roomId, setRoomId] = useState<number>(0);
  const [roomInfo, setRoomInfo] = useState<StudyRoomInfo>();
  const memberId = useRecoilValue(memberIdState);

  const applyModal = useModal();
  const applyCompleteModal = useModal();

  const decodeId = async () => {
    const decodedUrl = await decodeRoomId(url);
    setRoomId(decodedUrl);
  };

  const getRoomData = async () => {
    if (roomId === 0) return;
    const roomData = await getRoomInfo(roomId, memberId);
    setRoomInfo(roomData);
  };

  const handleApply = async () => {
    await applyRoom(roomId, memberId);
    applyModal.toggle();
    applyCompleteModal.toggle();
  };

  useEffect(() => {
    applyModal.setShowing(true);
    decodeId();
    getRoomData();
  }, [roomId]);

  return (
    <StApplyContainer>
      <LargeModal isShowing={applyModal.isShowing} title="스터디룸 참여">
        <StRoomCardWrapper>
          <p>스터디룸에 참여하시려면 참여 버튼을 눌러주세요.</p>
          {roomInfo && (
            <StudyroomCard roomData={roomInfo} handleApply={handleApply} />
          )}
          <CancelButton
            btnName="취소"
            onClick={() => {
              router.push('/home');
            }}
          />
        </StRoomCardWrapper>
      </LargeModal>
      <SmallModal
        title="스터디 참여 신청 완료"
        isShowing={applyCompleteModal.isShowing}
      >
        <StSmallModalWrapper>
          <StContentWrapper>
            <IcCharacterCheck />
            <p>
              스터디 참여 신청이 완료되었어요.
              <br />
              팀장이 수락한 뒤 스터디에 참여할 수 있어요.
            </p>
          </StContentWrapper>
          <ConfirmButton
            btnName="확인"
            onClick={() => {
              router.push('/home');
            }}
          />
        </StSmallModalWrapper>
      </SmallModal>
    </StApplyContainer>
  );
};

export default ApplyContainer;

const StApplyContainer = styled.main``;

const StRoomCardWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  padding: 1.6rem 0;

  & > p {
    margin-top: 1rem;
    ${({ theme }) => theme.fonts.Title5};
  }
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
  gap: 0.9rem;

  & > p {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
    font-size: 1.5rem;
  }
`;
