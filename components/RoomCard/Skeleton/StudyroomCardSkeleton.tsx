import { styled } from 'styled-components';

import { shimmerAnimation } from '@/utils/skeletonAnimation';

const StudyroomCardSkeleton = () => {
  return <StCardSkeleton />;
};

export default StudyroomCardSkeleton;

const StCardSkeleton = styled.div`
  width: 14.1rem;
  height: 18.6rem;

  border-radius: 1.6rem;
  background: linear-gradient(
    90deg,
    rgba(165, 165, 165, 0.4) 25%,
    rgba(165, 165, 165, 0.8) 50%,
    rgba(165, 165, 165, 0.4) 75%
  );
  background-size: 200% 100%;

  animation: ${shimmerAnimation} 2s infinite linear;
`;
