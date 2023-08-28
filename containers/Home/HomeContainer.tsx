import { styled } from 'styled-components';

import { Home } from '@/components/Home';

const index = () => {
  return (
    <StHomeContainer>
      <p>홈 페이지 컨테이너</p>
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
