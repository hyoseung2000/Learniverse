import { styled } from 'styled-components';

import { IcLoginBtn } from '@/public/assets/icons';

const Landing = () => {
  return (
    <StLandingWrapper>
      <h1>LearniVerse</h1>
      <IcLoginBtn />
    </StLandingWrapper>
  );
};

export default Landing;

const StLandingWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100vh;

  & > h1 {
    margin-bottom: 4rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};
    font-size: 8rem;
  }
  & > svg {
    cursor: pointer;
  }
`;
