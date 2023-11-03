// import { useRouter } from 'next/router';
// import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

import { IcLoginBtn } from '@/public/assets/icons';

// import { memberIdState } from '@/recoil/atom';

const Landing = () => {
  // const router = useRouter();
  // const setmemberId = useSetRecoilState(memberIdState);

  const handleLoginClick = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_APP_IP}/oauth2/authorization/github`;
    // setmemberId(1);
    // router.push('/home');
  };

  return (
    <StLandingWrapper>
      <h1>LearniVerse</h1>
      <StLoginBtn type="button" onClick={handleLoginClick}>
        <IcLoginBtn />
      </StLoginBtn>
    </StLandingWrapper>
  );
};

export default Landing;

const StLandingWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  width: 100%;
  height: 100vh;

  background-color: #0f173b;
  background: url('https://user-images.githubusercontent.com/73213437/264514735-92fc6e5a-7a3a-4841-a9fa-b97d778b2633.svg')
    center/cover no-repeat;

  & > h1 {
    margin-bottom: 4rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};
    font-size: 8rem;
  }
`;

const StLoginBtn = styled.button``;
