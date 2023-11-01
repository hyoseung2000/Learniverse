import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from 'styled-components';

import { useGetSearchResult } from '@/hooks/StudyRooms';

import { StudyroomCard } from '../RoomCard';
import { StMyPageRoomListWrapper } from '../RoomList/MyPageStudyRoomList';
import { SearchSkeleton, StudyroomListSkeleton } from '../RoomList/Skeleton';

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
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const { resultRoomList, getNextData, isResultRoomListLoading, isFinished } =
    useGetSearchResult(keyword, memberId, 0, searchType);

  const [nextPageLoading, setNextPageLoading] = useState(false);

  useEffect(() => {
    if (inView && !isFinished) {
      setNextPageLoading(true);
      getNextData();
    } else {
      setNextPageLoading(false);
    }
  }, [inView]);

  useEffect(() => {
    if (isFinished) {
      setNextPageLoading(false);
    }
  }, [isFinished]);

  if (isResultRoomListLoading) {
    return <StudyroomListSkeleton />;
  }
  return (
    <>
      <StRoomListWrapper>
        {resultRoomList && resultRoomList.length > 0
          ? resultRoomList.map((room) => (
              <div key={room.roomId} ref={ref}>
                <StudyroomCard
                  key={room.roomId}
                  roomData={room}
                  handleApply={
                    room.isMember === null
                      ? () => handleApply(room.roomId)
                      : undefined
                  }
                />
              </div>
            ))
          : searched &&
            !isResultRoomListLoading && <p>검색 결과가 없습니다.</p>}
      </StRoomListWrapper>
      {nextPageLoading && <SearchSkeleton />}
    </>
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
