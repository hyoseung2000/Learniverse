import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';

const StudyroomContainer = () => {
  const askPermission = async () => {
    const permission = await window.Notification.requestPermission();
    console.log(permission);
  };

  useEffect(() => {
    askPermission();
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
