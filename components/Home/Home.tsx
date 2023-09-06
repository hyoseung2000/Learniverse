import { styled } from "styled-components";

import { MyStudyroomList } from "../RoomList";

const Home = () => {
  return (
    <SwHomeWrapper>
      <h1>
        나의 스터디룸에서 코딩해요, <span>LearniVerse</span>
      </h1>
      <MyStudyroomList />
    </SwHomeWrapper>
  );
};

export default Home;

const SwHomeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3.79rem 11.3rem 0 11.3rem;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};

    & > span {
      background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
      background-clip: text;
      ${({ theme }) => theme.fonts.Head0};

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
