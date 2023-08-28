import { styled } from 'styled-components';

import { Header } from '@/components/Common/Header';
import { Home } from '@/components/Home';

const index = () => {
  return (
    <StHomeContainer>
      <p>홈 페이지 컨테이너</p>
      <Header />
      <Home />
    </StHomeContainer>
  );
};

export default index;

const StHomeContainer = styled.main`
  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
