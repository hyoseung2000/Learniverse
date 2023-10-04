import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { recommendRoomList, searchHashtag } from '@/apis/roomList';
import { applyRoom } from '@/apis/studyroom';
import {
  StContentWrapper,
  StSmallModalWrapper,
} from '@/containers/Apply/ApplyContainer';
import useModal from '@/hooks/useModal';
import { IcCharacterCheck } from '@/public/assets/icons';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';

import { ConfirmButton, PurpleButton } from '../Common/Button';
import { SmallModal } from '../Common/Modal';
import { StudyroomCard } from '../RoomCard';
import {
  StManageModalWrapper,
  StMyPageRoomListWrapper,
} from '../RoomList/MyPageStudyRoomList';
import SearchInput from './SearchInput';

const Search = () => {
  const curMemberId = useRecoilValue(memberIdState);
  const [searchResult, setSearchResult] = useState<StudyRoomInfo[]>();
  const [searched, setSearched] = useState(false);

  const applyCompleteModal = useModal();

  const handleSearch = async (searchInput: string) => {
    setSearched(true);
    const result = await searchHashtag(searchInput, curMemberId);
    setSearchResult(result);
  };

  const handleApply = async (roomId: number) => {
    await applyRoom(roomId, curMemberId);
    applyCompleteModal.toggle();
  };

  const handleRecommend = async () => {
    const recommend = await recommendRoomList(curMemberId);
    console.log(recommend);
  };
  return (
    <StSearchWrapper>
      <h1>스터디 검색</h1>
      <SearchInput handleSearch={handleSearch} />
      <PurpleButton
        btnName="✨ 나와 맞는 스터디 추천받기"
        handleClick={handleRecommend}
      />
      <StRoomListWrapper>
        {searchResult && searchResult.length > 0
          ? searchResult.map((room) => (
              <StudyroomCard
                key={room.roomId}
                roomData={room}
                handleApply={
                  room.isMember === null
                    ? () => handleApply(room.roomId)
                    : undefined
                }
              />
            ))
          : searched && <p>검색 결과가 없습니다.</p>}
      </StRoomListWrapper>

      <StCompleteModalWrapper $showing={applyCompleteModal.isShowing}>
        <SmallModal
          title="스터디 참여 신청 완료"
          isShowing={applyCompleteModal.isShowing}
        >
          <StModalWrapper>
            <StModalContentWrapper>
              <IcCharacterCheck />
              <p>
                스터디 참여 신청이 완료되었어요.
                <br />
                팀장이 수락한 뒤 스터디에 참여할 수 있어요.
              </p>
            </StModalContentWrapper>
            <ConfirmButton btnName="확인" onClick={applyCompleteModal.toggle} />
          </StModalWrapper>
        </SmallModal>
      </StCompleteModalWrapper>
    </StSearchWrapper>
  );
};

export default Search;

const StSearchWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.59rem 12rem 0 12rem;

  & > h1 {
    width: 100%;
    text-align: left;
    background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
    background-clip: text;
    ${({ theme }) => theme.fonts.Head0};

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StRoomListWrapper = styled(StMyPageRoomListWrapper)`
  position: relative;
  & > p {
    position: absolute;
    top: 10rem;
    left: -7rem;

    width: 23rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;

const StCompleteModalWrapper = styled(StManageModalWrapper)``;

const StModalWrapper = styled(StSmallModalWrapper)``;

const StModalContentWrapper = styled(StContentWrapper)``;
