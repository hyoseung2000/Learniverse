import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { styled } from 'styled-components';

import { addMoon } from '@/apis/moon';
import { Home } from '@/components/Home';
import { moonScoreState, todayState } from '@/recoil/atom';
import { totalMoonScoreSelector } from '@/recoil/selector';
import getToday from '@/utils/getToday';

const HomeContainer = () => {
  const totalMoonScore = useRecoilValue(totalMoonScoreSelector);
  const [moonScore, setMoonScore] = useRecoilState(moonScoreState);
  const [lastDay, setLastDay] = useRecoilState(todayState);

  const isMax = () => {
    return totalMoonScore >= 4;
  };

  const addFirstAccess = () => {
    console.log('today');
    if (isMax() || moonScore.isFirstAccess >= 1) return;
    setMoonScore((prevMoonScore) => ({
      ...prevMoonScore,
      isFirstAccess: prevMoonScore.isFirstAccess + 1,
    }));
  };

  // const addCoreTimeAccess = () => {
  //   if (isMax()) return;
  //   setMoonScore((prevMoonScore) => ({
  //     ...prevMoonScore,
  //     isCoreTimeParticipate: prevMoonScore.isCoreTimeParticipate + 1,
  //   }));
  // };

  // const addCapture = () => {
  //   if (isMax()) return;
  //   setMoonScore((prevMoonScore) => ({
  //     ...prevMoonScore,
  //     isCapture: prevMoonScore.isCapture + 1,
  //   }));
  // };

  const initMoonScore = () => {
    setMoonScore({
      isFirstAccess: 0,
      isCoreTimeParticipate: 0,
      isCapture: 0,
    });
  };
  console.log(lastDay);

  useEffect(() => {
    const today = getToday();
    // const today = '2023-08-20';
    if (lastDay !== today) {
      console.log('추가');
      setLastDay(today);
      initMoonScore();
      addFirstAccess();
    }
  }, []);

  useEffect(() => {
    const addMoons = async () => {
      const res = await addMoon(totalMoonScore);
      if (res === 400) return null;
      return res;
    };
    addMoons();
  }, [moonScore]);

  return (
    <StHomeContainer>
      {/* <button onClick={addFirstAccess}>첫 접속</button>
      <button onClick={addCoreTimeAccess}>코어타임</button>
      <button onClick={addCapture}>캡처</button> */}
      <Home />
    </StHomeContainer>
  );
};

export default HomeContainer;

const StHomeContainer = styled.main``;
