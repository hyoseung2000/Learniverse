import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { keyframes, styled } from 'styled-components';

import { getRoomInfo } from '@/apis/studyroom';
import { LargeModal, ModalWrapper } from '@/components/Common/Modal';
import { StudyroomCard } from '@/components/RoomCard';
import {
  StContentWrapper,
  StSmallModalWrapper,
} from '@/containers/Apply/ApplyContainer';
import { useModal } from '@/hooks/Common';
import { useGetRecommendRoomList } from '@/hooks/StudyRooms';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';

import ApplyCompleteModal from './ApplyCompleteModal';

interface RecommendModalProps {
  isShowing: boolean;
  toggleModal: () => void;
  handleApply: (roomId: number) => Promise<void>;
}

const RecommendModal = ({
  isShowing,
  toggleModal,
  handleApply,
}: RecommendModalProps) => {
  const curMemberId = useRecoilValue(memberIdState);

  const { recommendRoomIdList } = useGetRecommendRoomList(curMemberId);
  const [recommendResult, setRecommendResult] = useState<StudyRoomInfo[]>();
  const [loading, setLoading] = useState(false);

  const applyCompleteModal = useModal();

  const getRoomData = async (roomId: number) => {
    const roomData = await getRoomInfo(roomId, curMemberId);
    return roomData;
  };

  const handleRecommend = async () => {
    setLoading(true);
    if (recommendRoomIdList) {
      const roomDataPromises = recommendRoomIdList.map((id) => getRoomData(id));
      const rooms = await Promise.all(roomDataPromises);
      setRecommendResult(rooms);
    }
    setLoading(false);
  };

  const handleApplyClick = async (roomId: number) => {
    handleApply(roomId);
    applyCompleteModal.toggle();
  };

  useEffect(() => {
    handleRecommend();
  }, [isShowing]);

  return (
    <>
      <ModalWrapper isShowing={isShowing}>
        <LargeModal title="나와 맞는 스터디 추천받기" isShowing={isShowing}>
          <StCloseBtn type="button" onClick={toggleModal}>
            𝗫
          </StCloseBtn>
          <StRecommendWrapper>
            <StRecommendModalContentWrapper>
              {loading && (
                <StLoadingWrapper>
                  <div className="loading-animation" />
                  <p>
                    관심사와 희망 언어를 바탕으로 적합한 스터디를 찾고 있어요.
                  </p>
                </StLoadingWrapper>
              )}
              {!loading && (
                <StRecommendRoomList>
                  {recommendResult &&
                    recommendResult.map((room) => (
                      <StudyroomCard
                        key={room.roomId}
                        roomData={room}
                        handleApply={
                          room.isMember === null
                            ? () => handleApplyClick(room.roomId)
                            : undefined
                        }
                      />
                    ))}
                </StRecommendRoomList>
              )}
            </StRecommendModalContentWrapper>
          </StRecommendWrapper>
        </LargeModal>
      </ModalWrapper>
      <ApplyCompleteModal
        isShowing={applyCompleteModal.isShowing}
        toggleModal={applyCompleteModal.toggle}
      />
    </>
  );
};

export default RecommendModal;

const StCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;

  ${({ theme }) => theme.fonts.Title1};
`;

const StRecommendModalContentWrapper = styled(StContentWrapper)``;

const StRecommendWrapper = styled(StSmallModalWrapper)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-x: auto;

  width: 90%;
  height: 37.8rem;
  margin-left: 1.5rem;
`;

const StRecommendRoomList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;

  padding: 2rem;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;

  padding: 10rem 0 0 8rem;

  & > p {
    width: 100%;
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    ${({ theme }) => theme.fonts.Title5};
    font-size: 1.5rem;
  }
  & > .loading-animation {
    content: '';

    width: 5rem;
    height: 5rem;

    border: 1rem solid rgba(156, 156, 156, 0.3);
    border-radius: 50%;
    border-top: 1rem solid ${({ theme }) => theme.colors.Blue};
    animation: ${rotate} 1s linear infinite;
  }
`;
