import { useRouter } from 'next/router';
import { css, styled } from 'styled-components';

import { IcLogo, IcProfile } from '@/public/assets/icons';

const Header = () => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <StHeaderWrapper path={asPath}>
      <StHeader>
        <IcLogo />
        <button type="button">
          logout
          <IcProfile />
        </button>
      </StHeader>
    </StHeaderWrapper>
  );
};

export default Header;

const StHeaderWrapper = styled.header<{ path: string }>`
  height: 10rem;
  padding: 5rem 10rem 0 5rem;

  ${({ path }) =>
    path === '/' &&
    css`
      display: none;
    `}
`;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  & > button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.9rem;

    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
