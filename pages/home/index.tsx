import { styled } from 'styled-components';

import { Header } from '@/components/Common/Header';
import { Home } from '@/components/Home';

export default function index() {
  return (
    <StHomePageWrapper>
      <p>홈 페이지 라우팅</p>
      <Header />
      <Home />
    </StHomePageWrapper>
  );
}

const StHomePageWrapper = styled.div`
  & > p {
    color: blue;
  }
`;
