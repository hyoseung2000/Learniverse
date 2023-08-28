import { styled } from 'styled-components';

const Landing = () => {
  return <StLandingWrapper>랜딩페이지</StLandingWrapper>;
};

export default Landing;

const StLandingWrapper = styled.main`
  ${({ theme }) => theme.fonts.Head0};
  color: ${({ theme }) => theme.colors.Green};
`;
