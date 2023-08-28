import { styled } from 'styled-components';

import { IcLogo, IcProfile } from '@/public/assets/icons';

const Header = () => {
  return (
    <StHeader>
      <p>헤더 컴포넌트입니다</p>
      <IcLogo />
      <IcProfile />
    </StHeader>
  );
};

export default Header;

// styled component는 앞에 St 접두사 붙이기!!!! (일반 컴포넌트와 구분을 위해서)
const StHeader = styled.header`
  // css 순서 및 개행 컨벤션 지키기!!!
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100px;

  background-color: yellow;

  & > p {
    color: red;
  }
`;
