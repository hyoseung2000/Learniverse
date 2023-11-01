import { styled } from 'styled-components';

import { StudyroomCardSkeleton } from '@/components/RoomCard/Skeleton';

const SearchSkeleton = () => {
  return (
    <StStudyroomListWrapper>
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
    </StStudyroomListWrapper>
  );
};

export default SearchSkeleton;

const StStudyroomListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: -6rem;
  margin-bottom: 6rem;
`;
