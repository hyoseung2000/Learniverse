// import { useRecoilValue } from 'recoil';

// import { moonScoreState } from '@/recoil/atom';
// import { totalMoonScoreSelector } from '@/recoil/selector';

export const addMoonScore = () => {
  // const [moonScore, setMoonScoreState] = useRecoilState(moonScoreState);

  const isMax = () => {
    // const totalMoonScore = useRecoilValue(totalMoonScoreSelector);
    // return totalMoonScore >= 4;
  };

  const addFirstAccess = () => {
    // if (isMax() || moonScore.isFirstAccess === 1) return;
    // setMoonScoreState((prevMoonScore) => ({
    //   ...prevMoonScore,
    //   isFirstAccess: prevMoonScore.isFirstAccess + 1,
    // }));
  };

  const addCoreTimeAccess = () => {
    // if (isMax()) return;
    // setMoonScoreState((prevMoonScore) => ({
    //   ...prevMoonScore,
    //   isCoreTimeParticipate: prevMoonScore.isCoreTimeParticipate + 1,
    // }));
  };

  const addCapture = () => {
    // if (isMax()) return;
    // setMoonScoreState((prevMoonScore) => ({
    //   ...prevMoonScore,
    //   isCapture: prevMoonScore.isCapture + 1,
    // }));
  };

  return { isMax, addFirstAccess, addCoreTimeAccess, addCapture };
};
