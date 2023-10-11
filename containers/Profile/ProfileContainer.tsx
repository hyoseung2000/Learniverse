import { styled } from 'styled-components';

import { Profile } from '@/components/Profile';

const ProfileContainer = () => {
  return (
    <StProfileWrapper>
      <Profile />
    </StProfileWrapper>
  );
};

export default ProfileContainer;

const StProfileWrapper = styled.main``;
