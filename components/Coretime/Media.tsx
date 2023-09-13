import { styled } from 'styled-components';

import { IcCoreChar, IcMedia, IcMike, IcSpeaker } from '@/public/assets/icons';

import { CoreBtn } from '../Common/Button';

const Media = () => {
  const handleOut = () => {};

  return (
    <StMediaMainWrapper>
      <IcMedia />
      <IcMike />
      <IcSpeaker />
      <StMediaWrapper>
        <div>
          <StVideo>
            <p>코딩천사 선영이</p>
          </StVideo>
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
    </StMediaMainWrapper>
  );
};

export default Media;

const StMediaMainWrapper = styled.main`
  & > svg {
    margin-top: 1rem;
    margin-right: 1rem;
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

  position: relative;

  background: ${({ theme }) => theme.colors.Gray4};

  & > p {
    position: absolute;
    left: 0rem;
    bottom: 0.8rem;

    background: ${({ theme }) => theme.colors.Yellow2};
    color: ${({ theme }) => theme.colors.Purple4};
    ${({ theme }) => theme.fonts.Body9};
  }
`;

const StbtnWrapper = styled.div`
  margin-top: 10rem;
`;
