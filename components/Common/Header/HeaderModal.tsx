import { useRouter } from 'next/router';
import { styled } from 'styled-components';

interface HeaderModalProps {
  isShowing: boolean;
  handleHide: React.MouseEventHandler;
}

const HeaderModal = ({ isShowing, handleHide }: HeaderModalProps) => {
  const router = useRouter();
  return (
    isShowing && (
      <StHeaderModalWrapper>
        <button type="button" onClick={}>
          프로필 설정
        </button>
        <button
          type="button"
          onClick={() => {
            router.push('/mypage');
          }}
        >
          마이페이지
        </button>
        <button type="button" onClick={}>
          logout
        </button>
      </StHeaderModalWrapper>
    )
  );
};

export default HeaderModal;

const StHeaderModalWrapper = styled.div`
  width: 7rem;
  height: 5.7rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.Purple1};
`;
