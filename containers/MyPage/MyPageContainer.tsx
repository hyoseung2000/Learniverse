import { styled } from 'styled-components';

import { MyPage } from '@/components/MyPage';

const MyPageContainer = () => {
  return (
    <StMyPageContainer>
      <MyPage />
    </StMyPageContainer>
  );
};

export default MyPageContainer;

const StMyPageContainer = styled.main``;
