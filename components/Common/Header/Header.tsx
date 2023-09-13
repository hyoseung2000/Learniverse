import { useRouter } from 'next/router';
import { css, styled } from 'styled-components';

import useModal from '@/hooks/useModal';
import { IcLogo, IcProfile } from '@/public/assets/icons';

import HeaderModal from './HeaderModal';

const Header = () => {
  const router = useRouter();
  const { asPath } = router;

  const { isShowing, toggle } = useModal();

  return (
    <StHeaderWrapper path={asPath}>
      <StHeader>
        <IcLogo
          onClick={() => {
            router.push('/home');
          }}
        />
        <button type="button" onClick={toggle}>
          <IcProfile />
        </button>
        <StHeaderModalWrapper>
          <HeaderModal isShowing={isShowing} handleHide={toggle} />
        </StHeaderModalWrapper>
      </StHeader>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.header<{ path: string }>`
  height: 9.6rem;
  padding: 5rem 10rem 0rem 5rem;
  box-sizing: border-box;

  ${({ path }) =>
    path === '/' &&
    css`
      display: none;
    `}
`;

const StHeader = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;

  width: 100%;

  & > svg {
    cursor: pointer;
  }
  & > button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.9rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;

const StHeaderModalWrapper = styled.div`
  position: absolute;
  top: 5rem;
  right: 0;
`;
