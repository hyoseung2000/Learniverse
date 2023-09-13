import { useState } from 'react';
import { styled } from 'styled-components';

const WebRTCContainer = () => {
  // const [isLobby, setIsLobby] = useState(true);
  // const { stream } = useMediaStream();

  return (
    <StWebRTCContainerWrapper>
      <StMediaWrapper>
        <StMedia />
        <StMedia />
        <StMedia />
        <StMedia />
        <StMedia />
      </StMediaWrapper>
      <StUserWrapper>
        <p>접속자</p>
        <p>접속자</p>
        <p>접속자</p>
        <p>접속자</p>
        <p>접속자</p>
      </StUserWrapper>
    </StWebRTCContainerWrapper>
  );
};

export default WebRTCContainer;

const StWebRTCContainerWrapper = styled.main`
  display: flex;
  justify-content: space-between;

  width: 100%;
  padding: 5rem;
  box-sizing: border-box;
`;

const StUserWrapper = styled.section`
  width: 20%;

  & > p {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Body0};
  }
`;
const StMediaWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  gap: 1rem;

  width: fit-content;
`;

const StMedia = styled.div`
  width: 30rem;
  height: 20rem;

  background-color: ${({ theme }) => theme.colors.Gray4};
  border-radius: 1rem;
`;
