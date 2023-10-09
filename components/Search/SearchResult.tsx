import { styled } from 'styled-components';

import { useGetSearchResult } from '@/hooks/StudyRooms';

import { StudyroomCard } from '../RoomCard';
import { StMyPageRoomListWrapper } from '../RoomList/MyPageStudyRoomList';

interface SearchResultProps {
  searched: boolean;
  searchType: string;
  keyword: string;
  memberId: number;
  handleApply: (roomId: number) => Promise<void>;
}

const SearchResult = ({
  searched,
  searchType,
  keyword,
  memberId,
  handleApply,
}: SearchResultProps) => {
  const { resultRoomList, isLoading } = useGetSearchResult(
    keyword,
    memberId,
    0,
    searchType,
  );

  return (
    <StRoomListWrapper>
      {resultRoomList && resultRoomList.length > 0
        ? resultRoomList.map((room) => (
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
        : searched && !isLoading && <p>검색 결과가 없습니다.</p>}
    </StRoomListWrapper>
  );
};

export default SearchResult;

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
