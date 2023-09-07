import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

import { applyRoom, decodeRoomId, getRoomInfo } from '@/apis/studyroom';
import { CancelButton } from '@/components/Common/Button';
import { LargeModal } from '@/components/Common/Modal';
import { StudyroomCard } from '@/components/RoomCard';
import { studyRoomInfo } from '@/types/studyroom';

interface ApplyContainerProps {
  url: string;
}

const ApplyContainer = ({ url }: ApplyContainerProps) => {
  const router = useRouter();
  const [roomId, setRoomId] = useState<number>(0);
  const [roomInfo, setRoomInfo] = useState<studyRoomInfo>();

  const ROOM_DATA = {
    roomId: 27,
    roomName: '러니버스',
    roomIntro: '소웨공주들 졸프',
    hashtags: ['졸프'],
    roomCategory: '그룹/모임',
    roomCount: 1,
    roomLimit: 5,
    isMember: '팀장',
  };

  const decodeId = async () => {
    const decodedUrl = await decodeRoomId(url);
    console.log(decodedUrl);
    setRoomId(decodedUrl);
  };

  const getRoomData = async () => {
    const roomData = await getRoomInfo(roomId);
    setRoomInfo(roomData);
  };

  const handleApply = async () => {
    await applyRoom(27, 2); // memberId=1
  };

  useEffect(() => {
    // decodeId();
    // getRoomData();
  }, [url]);

  return (
    <StApplyContainer>
      <LargeModal isShowing={true} title={'스터디룸 참여'}>
        <StRoomCardWrapper>
          <p>스터디룸에 참여하시려면 '참여' 버튼을 눌러주세요.</p>
          {ROOM_DATA && (
            <StudyroomCard roomData={ROOM_DATA} handleApply={handleApply} />
          )}
          <CancelButton
            btnName="취소"
            onClick={() => {
              router.push('/');
            }}
          />
        </StRoomCardWrapper>
      </LargeModal>
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
