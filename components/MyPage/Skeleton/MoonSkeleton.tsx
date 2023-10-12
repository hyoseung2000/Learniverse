import { styled } from 'styled-components';

import { shimmerAnimation } from '@/utils/skeletonAnimation';

const MoonSkeleton = () => {
  return <StMoonSkeleton />;
};

export default MoonSkeleton;

const StMoonSkeleton = styled.div`
  width: 40.5rem;
  height: 15.4rem;

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
