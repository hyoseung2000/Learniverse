import { selector } from 'recoil';

import { moonScoreState } from './atom';

export const totalMoonScoreSelector = selector({
  key: 'totalMoonScore',
  get: ({ get }) => {
    const moonScore = get(moonScoreState);
    return (
      moonScore.isFirstAccess +
      moonScore.isCoreTimeParticipate +
      moonScore.isCapture
    );
  },
});
