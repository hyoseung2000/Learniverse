import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { searchHashtag } from '@/apis/roomList';
import { memberIdState } from '@/recoil/atom';
import { StudyRoomInfo } from '@/types/studyroom';

import { PurpleButton } from '../Common/Button';
import { StudyroomCard } from '../RoomCard';
import { StMyPageRoomListWrapper } from '../RoomList/MyPageStudyRoomList';
import SearchInput from './SearchInput';

const Search = () => {
  const curMemberId = useRecoilValue(memberIdState);
  const [searchResult, setSearchResult] = useState<StudyRoomInfo[]>();

  const handleSearch = async (searchInput: string) => {
    const result = await searchHashtag(searchInput, curMemberId);
    setSearchResult(result);
  };

  const handleRecommend = () => {
    console.log('스터디 추천 : 2차 데모 이후 개발');
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
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((room) => (
            <StudyroomCard key={room.roomId} roomData={room} />
          ))
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}
      </StRoomListWrapper>
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
