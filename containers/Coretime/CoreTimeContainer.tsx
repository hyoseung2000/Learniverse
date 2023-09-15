import { styled } from 'styled-components';

import { CoreTime } from '@/components/Coretime';

const CoreTimeContainer = () => {
  return (
    <StCoreTimeWrapper>
      <CoreTime />
    </StCoreTimeWrapper>
  );
};

export default CoreTimeContainer;

const StCoreTimeWrapper = styled.main``;
