import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';

// import { logout } from '@/apis/login';
import { memberIdState } from '@/recoil/atom';

interface HeaderModalProps {
  isShowing: boolean;
  // handleHide: React.MouseEventHandler;
}

const HeaderModal = ({ isShowing }: HeaderModalProps) => {
  const router = useRouter();
  const setMemberId = useSetRecoilState(memberIdState);

  const handleProfile = () => {
    router.push('/profile');
  };
  const handleLogout = async () => {
    setMemberId(0);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('로그아웃');
    // await logout();
    router.push('/');
  };

  return (
    isShowing && (
      <StHeaderModalWrapper>
        <button type="button" onClick={handleProfile}>
          프로필 설정
        </button>
        <hr />
        <button
          type="button"
          onClick={() => {
            router.push('/mypage');
          }}
        >
          마이페이지
        </button>
        <hr />
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      </StHeaderModalWrapper>
    )
  );
};

export default HeaderModal;

const StHeaderModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.3rem;

  width: 10rem;
  height: fit-content;
  padding: 0.6rem;
  box-sizing: border-box;

  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.Purple1};

  & > button {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body2};
  }
  & > button:hover {
    color: ${({ theme }) => theme.colors.SkyBlue};
  }
`;
