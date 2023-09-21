import { useEffect } from 'react';
import { styled } from 'styled-components';

import { Studyroom } from '@/components/Studyroom';
import { usePushNotification } from '@/hooks/usePushNotification';

const StudyroomContainer = () => {
  const pushNotification = usePushNotification();

  const askPermission = async () => {
    await window.Notification.requestPermission();
  };

  useEffect(() => {
    askPermission();
    if (pushNotification) {
      pushNotification.fireNotification('스크린이 캡처되었습니다!', {
        body: '60초 이내에 전송해주세요!',
      });
    }
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
