import { styled } from 'styled-components';

import { SignUp } from '@/components/SignUp';

const SignUpContainer = () => {
  return (
    <StSignUpWrapper>
      <SignUp />
    </StSignUpWrapper>
  );
};

export default SignUpContainer;

const StSignUpWrapper = styled.main``;
