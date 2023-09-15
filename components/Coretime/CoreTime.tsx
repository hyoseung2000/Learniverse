import { styled } from 'styled-components';

import { IcTimer } from '@/public/assets/icons';

import { Side } from '../Side';
import Media from './Media';

const CoreTime = () => {
  return (
    <StCoreTimeWrapper>
      <StCoreMainWrapper>
        <StTimeWrapper>
          <IcTimer />
          <h1>1 : 38 : 30 </h1>
        </StTimeWrapper>
        <Media />
      </StCoreMainWrapper>
      <StCoreSideWrapper>
        <Side chatName="코어타임 채팅" />
      </StCoreSideWrapper>
    </StCoreTimeWrapper>
  );
};

export default CoreTime;

const StCoreTimeWrapper = styled.main`
  display: flex;
  width: 100%;
`;
const StCoreMainWrapper = styled.div`
  width: 65%;

  margin-top: 2.6rem;
  margin-left: 11.2rem;
`;

const StTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > h1 {
    margin-left: 1.4rem;

    color: ${({ theme }) => theme.colors.Orange2};
    ${({ theme }) => theme.fonts.Head0};
  }
`;
const StCoreSideWrapper = styled.div`
  width: 35%;
  height: 76.8rem;

  margin-left: 3.1rem;

  background: linear-gradient(
    47deg,
    rgba(238, 238, 250, 0.15) 7%,
    rgba(238, 238, 250, 0.03) 100%
  );

  & > svg {
    width: 100%;
  }
`;
