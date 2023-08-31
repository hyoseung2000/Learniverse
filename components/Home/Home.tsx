import { styled } from 'styled-components';

import { PurpleButton } from '../Common/Button';
import { StudyroomList } from '../RoomList';
import Search from './Search';

const Home = () => {
  const handleRecommend = () => {
    console.log('스터디 추천 : 2차 데모 이후 개발');
  };

  return (
    <SwHomeWrapper>
      <h1>
        나의 스터디룸에서 코딩해요, <span>LearniVerse</span>
      </h1>
      <Search />
      <PurpleButton
        btnName="✨ 나와 맞는 스터디 추천받기"
        handleClick={handleRecommend}
      />
      <StudyroomList />
    </SwHomeWrapper>
  );
};

export default Home;

const SwHomeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    margin-top: 3.8rem;
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
