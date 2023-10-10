import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';

const StudyroomContainer = () => {
  return (
    <StStudyroomWrapper>
      <Studyroom />
    </StStudyroomWrapper>
  );
};

export default StudyroomContainer;

const StStudyroomWrapper = styled.main``;
