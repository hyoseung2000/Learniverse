import { styled } from 'styled-components';

import {
  IcCoreChar,
  IcMedia,
  IcMike,
  IcSpeaker,
  IcTimer,
} from '@/public/assets/icons';

import { CoreBtn } from '../Common/Button';
import { Side } from '../Side';

const CoreTime = () => {
  const handleOut = () => {};

  return (
    <StCoreTimeWrapper>
      <StCoreMainWrapper>
        <StTimeWrapper>
          <IcTimer />
          <h1>1 : 38 : 30 </h1>
        </StTimeWrapper>
        <IcMedia />
        <IcMike />
        <IcSpeaker />
        <StMediaWrapper>
          <div>
            <StVideo />
            <IcCoreChar />
          </div>
          <div>
            <StVideo />
            <IcCoreChar />
          </div>
          <div>
            <StVideo />
            <IcCoreChar />
          </div>
          <div>
            <StVideo />
            <IcCoreChar />
          </div>
          <div>
            <StVideo />
            <IcCoreChar />
          </div>
          <StbtnWrapper>
            <CoreBtn btnName="코어타임 나가기" handleClick={handleOut} />
          </StbtnWrapper>
        </StMediaWrapper>
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

  & > svg {
    margin-top: 1rem;
    margin-right: 1rem;
  }
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

const StMediaWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 1rem;

  & > div {
    margin-top: 4rem;

    display: flex;
  }
`;

const StVideo = styled.div`
  height: 13.4rem;
  width: 23.4rem;

  background: ${({ theme }) => theme.colors.Gray4};
`;

const StbtnWrapper = styled.div`
  margin-top: 10rem;
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
