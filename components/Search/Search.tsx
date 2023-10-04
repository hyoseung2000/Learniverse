import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { keyframes, styled } from 'styled-components';

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
import { LargeModal, SmallModal } from '../Common/Modal';
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
  const [loading, setLoading] = useState(false);

  const applyCompleteModal = useModal();
  const recommendModal = useModal();

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
    recommendModal.toggle();
    setLoading(true);
    const recommend = await recommendRoomList(curMemberId);
    setLoading(false);
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

      <StRecommendModalWrapper $showing={recommendModal.isShowing}>
        <LargeModal
          title="나와 맞는 스터디 추천받기"
          isShowing={recommendModal.isShowing}
        >
          <StCloseBtn type="button" onClick={recommendModal.toggle}>
            𝗫
          </StCloseBtn>
          <StRecommendWrapper>
            <StModalContentWrapper>
              {loading && (
                <StLoadingWrapper>
                  <div className="loading-animation" />
                  <p>
                    관심사와 희망 언어를 바탕으로 적합한 스터디를 찾고 있어요.
                  </p>
                </StLoadingWrapper>
              )}
            </StModalContentWrapper>
          </StRecommendWrapper>
        </LargeModal>
      </StRecommendModalWrapper>
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

const StCloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;

  ${({ theme }) => theme.fonts.Title1};
`;

const StCompleteModalWrapper = styled(StManageModalWrapper)``;

const StModalWrapper = styled(StSmallModalWrapper)``;

const StModalContentWrapper = styled(StContentWrapper)``;

const StRecommendModalWrapper = styled(StManageModalWrapper)``;

const StRecommendWrapper = styled(StSmallModalWrapper)`
  height: 37.8rem;
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

  padding-top: 13rem;

  & > p {
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
