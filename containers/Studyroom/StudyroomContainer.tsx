import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';
import usePushNotification from '@/hooks/usePushNotification';

const StudyroomContainer = () => {
  const pushNotification = usePushNotification();

  useEffect(() => {
    if (pushNotification) pushNotification.fireNotification('ㅎㅇ');
  }, []);
  return (
    <StStudyroomWrapper>
      <Studyroom />
    </StStudyroomWrapper>
  );
};

export default StudyroomContainer;

const StStudyroomWrapper = styled.main`
  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
