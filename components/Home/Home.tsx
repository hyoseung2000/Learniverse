import { styled } from 'styled-components';

import { PurpleButton } from '../Common/Button';
import { MyStudyroomList } from '../RoomList';

const Home = () => {
  const alarmGrant = () => {
    Notification.requestPermission().then((permission) => {
      if (permission !== 'granted') return console.log(permission);
      console.log(permission);
      return permission;
    });
  };

  return (
    <SwHomeWrapper>
      <h1>
        나의 스터디룸에서 코딩해요, <span>LearniVerse</span>
      </h1>
      <PurpleButton btnName="푸시알림 허용" handleClick={alarmGrant} />
      <MyStudyroomList />
    </SwHomeWrapper>
  );
};

export default Home;

const SwHomeWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 3.79rem 11.3rem 0 11.3rem;

  & > h1 {
    color: ${({ theme }) => theme.colors.White};
    ${({ theme }) => theme.fonts.Head0};

    & > span {
      width: fit-content;

      background: linear-gradient(90deg, #9985fe 0%, #93cdfd 100%);
      background-clip: text;
      ${({ theme }) => theme.fonts.Head0};

      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
