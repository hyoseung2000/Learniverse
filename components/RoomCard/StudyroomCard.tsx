import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { mutate } from 'swr';

import { pinRoom } from '@/apis/roomList';
import { enterRoomLog } from '@/apis/studyroom';
import { IcPlanet, IcStar, IcStarPinned } from '@/public/assets/icons';
import { memberIdState, roomIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';
import { getCategoryColor } from '@/utils/getCategoryColor';

interface StudyroomCardProps {
  roomData: StudyRoomInfo;
  roomType?: string;
  isPinned?: boolean;
  isMyroom?: boolean;
  isInterest?: boolean;
  isSelected?: boolean;
  handleApply?: () => void;
  handleManage?: () => void;
  handleEdit?: () => void;
  handleSelected?: (roomId: number) => void;
}

const StudyroomCard = ({
  roomData,
  roomType,
  isPinned,
  isMyroom,
  isInterest,
  isSelected,
  handleApply,
  handleManage,
  handleEdit,
  handleSelected,
}: StudyroomCardProps) => {
  const {
    roomId,
    roomName,
    roomIntro,
    roomHashtags,
    roomCategory,
    roomCount,
    roomLimit,
    isMember,
  } = roomData;

  const router = useRouter();
  const memberId = useRecoilValue(memberIdState);
  const planetColor = getCategoryColor(roomCategory);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const isMemberApproved = isMember === '승인' || isMember === '팀장';
  const canJoinRoom =
    isMemberApproved || (isMember === null && roomLimit > roomCount);

  const showManagementButtons = roomType === 'leader';
  const showStatus = roomType === 'apply';

  let displayedRoomName = roomName;
  if (roomName.length > 10) {
    displayedRoomName = `${roomName.substring(0, 10)}...`;
  }
  let displayedRoomIntro = roomIntro;
  if (roomIntro.length > 17) {
    displayedRoomIntro = `${roomIntro.substring(0, 17)}...`;
  }

  const setroomID = useSetRecoilState(roomIdState);

  const handlePin = async () => {
    await pinRoom(roomId, memberId);
    mutate(`/member/room/list?memberId=${memberId}`);
  };

  const handleGotoRoom = async () => {
    enterRoomLog(roomId, memberId);
    setroomID(roomId);
    router.push(`/studyroom/${roomId}`);
  };

  return (
    <StCardWrapper>
      <StStudyroomCardWrapper
        $isSelected={isSelected!}
        onClick={() => {
          handleSelected?.(roomId);
          setShowOverlay((prev) => !prev);
        }}
      >
        <StStarWrapper
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            handlePin();
            e.stopPropagation();
          }}
        >
          {isMyroom && (isPinned ? <IcStarPinned /> : <IcStar />)}
        </StStarWrapper>
        <StIconWrapper $planetColor={planetColor}>
          {roomId}
          <IcPlanet />
        </StIconWrapper>
        <StRoomName>{displayedRoomName}</StRoomName>
        <StHashtags>
          {roomHashtags.map((hashtag) => (
            <li key={hashtag}>#{hashtag}</li>
          ))}
        </StHashtags>
        <StCategory>{roomCategory}</StCategory>
        <StIntro>{displayedRoomIntro}</StIntro>
        {!isInterest && (
          <StJoinWrapper>
            <StLimit>
              정원
              <span> {roomCount}</span> / {roomLimit}명
            </StLimit>
            {isMember === null ? (
              <StJoin
                type="button"
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleApply!();
                  e.stopPropagation();
                }}
              >
                참여
              </StJoin>
            ) : (
              <StEnter
                type="button"
                disabled={!canJoinRoom}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  handleGotoRoom();
                  e.stopPropagation();
                }}
              >
                입장
              </StEnter>
            )}
          </StJoinWrapper>
        )}
        <StOverlay $isVisible={showOverlay}>
          <StRoomName>{roomName}</StRoomName>
          <StHashtags>
            {roomHashtags.map((hashtag) => (
              <li key={hashtag}>#{hashtag}</li>
            ))}
          </StHashtags>
          <StIntro>{roomIntro}</StIntro>
        </StOverlay>
      </StStudyroomCardWrapper>
      {showManagementButtons && (
        <StBtnWrapper>
          <button type="button" className="manage" onClick={handleManage}>
            신청자 관리
          </button>
          <button type="button" className="edit" onClick={handleEdit}>
            스터디 정보수정
          </button>
        </StBtnWrapper>
      )}
      {showStatus && (
        <StStatusWrapper $memberStatus={isMember}>
          신청 현황 <span>{isMember}</span>
        </StStatusWrapper>
      )}
    </StCardWrapper>
  );
};

export default StudyroomCard;

const StCardWrapper = styled.div`
  width: 14.1rem;
`;

const StOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  padding: 4rem 0;
  box-sizing: border-box;

  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.9);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: ${({ $isVisible }) => ($isVisible ? 'auto' : 'none')};
  transition: opacity 0.3s;

  p,
  ol {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    max-width: 90%;
  }
`;

const StStudyroomCardWrapper = styled.article<{ $isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 18.6rem;
  ${({ $isSelected }) => ($isSelected ? 'padding: 0rem;' : 'padding: 1rem;')}
  box-sizing: border-box;

  border-radius: 1.6rem;
  box-shadow: 2.79591px 2.79591px 5.59181px 3.49488px rgba(0, 0, 0, 0.24);

  color: ${({ theme }) => theme.colors.Gray1};
  ${({ theme }) => theme.fonts.Title5};

  ${({ $isSelected }) =>
    $isSelected
      ? 'border: 1rem outset transparent; background: linear-gradient(#ffffff, #ffffff), linear-gradient(93deg, #9985fe 1%, #93cdfd 100%); background-origin: border-box; background-clip: content-box, border-box;'
      : 'background: #ffffff;'};
`;

const StStarWrapper = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;

  cursor: pointer;
`;

const StIconWrapper = styled.div<{ $planetColor: string }>`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 5.2rem;

  margin-top: 1rem;

  & > svg {
    width: 3.5rem;
    height: 3.5rem;
    margin-top: 0.4rem;

    path {
      fill: ${({ $planetColor }) => $planetColor};
    }
  }
`;
const StRoomName = styled.p`
  ${({ theme }) => theme.fonts.Body2};
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  padding-bottom: 0.2rem;
`;

const StHashtags = styled.ol`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.3rem;
  overflow: hidden;

  width: 100%;
  height: fit-content;
  max-width: 100%;
  margin: 0.6rem 0;

  & > li {
    display: inline-block;
    height: 1rem;

    padding: 0.2rem 0.5rem;

    border-radius: 1.6rem;
    background-color: ${({ theme }) => theme.colors.Gray4};
    color: ${({ theme }) => theme.colors.Gray1};
    ${({ theme }) => theme.fonts.Body7};
  }
`;

const StCategory = styled.p`
  margin-bottom: 0.3rem;

  color: ${({ theme }) => theme.colors.Purple4};
  ${({ theme }) => theme.fonts.Body6};
  text-align: center;
`;

const StIntro = styled.p`
  overflow: hidden;

  width: 100%;
  height: 1.3rem;
  margin-bottom: 0.5rem;

  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body8};
  text-align: center;
`;

const StJoinWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const StLimit = styled.p`
  color: ${({ theme }) => theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body6};

  & > span {
    color: ${({ theme }) => theme.colors.Orange1};
    ${({ theme }) => theme.fonts.Body6};
  }
`;

const StEnter = styled.button`
  padding: 0.2rem 0.7rem;

  border-radius: 0.4rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.Gray4 : theme.colors.Yellow2};
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.White : theme.colors.Learniverse_BG};
  ${({ theme }) => theme.fonts.Body8};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

const StJoin = styled(StEnter)`
  background-color: ${({ theme }) => theme.colors.Purple4};
  color: ${({ theme }) => theme.colors.White};
`;

const StBtnWrapper = styled.div`
  display: flex;
  gap: 0.6rem;

  width: 100%;
  height: 2rem;
  margin-top: 0.5rem;

  & > button {
    padding: 0.3rem 0.45rem;

    border-radius: 0.5rem;
    ${({ theme }) => theme.fonts.Body6};
  }
  .manage {
    color: ${({ theme }) => theme.colors.LightGray2};
    background-color: ${({ theme }) => theme.colors.Purple3};
  }
  .edit {
    color: ${({ theme }) => theme.colors.Learniverse_BG};
    background-color: ${({ theme }) => theme.colors.SkyBlue};
  }
`;

const StStatusWrapper = styled.div<{ $memberStatus: string }>`
  display: flex;
  justify-content: center;
  gap: 0.3rem;

  margin-top: 0.3rem;

  color: ${({ theme }) => theme.colors.LightGray1};
  ${({ theme }) => theme.fonts.Title5};

  & > span {
    margin-top: 0.3rem;
    margin-left: 2.4rem;
    padding: 0rem 0.3rem;

    border-radius: 0.4rem;
    ${({ theme }) => theme.fonts.Body4};
    background-color: ${({ $memberStatus }) => {
      switch ($memberStatus) {
        case '승인':
          return '#0ACF84';
        case '거절':
          return '#F14E1C';
        case '대기':
          return '#26C6DA';
        default:
          return 'transparent';
      }
    }};
  }
`;
