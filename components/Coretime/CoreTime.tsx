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
      <Side chatName="코어타임 채팅" />
    </StCoreTimeWrapper>
  );
};

export default CoreTime;

const StCoreTimeWrapper = styled.main`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 1.5rem 6.5rem 0 6.5rem;
  box-sizing: border-box;
`;
const StCoreMainWrapper = styled.div`
  width: 65%;
`;

const StTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;

  & > h1 {
    padding-left: 1.4rem;

    color: ${({ theme }) => theme.colors.Orange2};
    ${({ theme }) => theme.fonts.Head0};
  }
`;
