import { styled } from 'styled-components';

import Media from './Media';
import { TimeProvider, Timer } from './Timer';

const CoreTime = () => {
  return (
    <StCoreTimeWrapper>
      <StCoreMainWrapper>
        <TimeProvider>
          <Timer />
        </TimeProvider>
        <Media />
      </StCoreMainWrapper>
    </StCoreTimeWrapper>
  );
};

export default CoreTime;

const StCoreTimeWrapper = styled.main`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 1.5rem 6.5rem 0 6.5rem;
  box-sizing: border-box;
`;
const StCoreMainWrapper = styled.div`
  width: 65%;
`;
