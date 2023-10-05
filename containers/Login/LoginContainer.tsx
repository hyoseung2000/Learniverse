import { styled } from 'styled-components';

import { Login } from '@/components/Login';

const LoginContainer = () => {
  return (
    <StLoginWrapper>
      <Login />
    </StLoginWrapper>
  );
};

export default LoginContainer;

const StLoginWrapper = styled.main``;
