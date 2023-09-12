import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { moonScoreInfo } from '@/types/member';
import getToday from '@/utils/getToday';

import { totalMoonScoreSelector } from './selector';

const { persistAtom } = recoilPersist();

const resetTime = new Date();
resetTime.setHours(0, 0, 0, 0);

export const encodedUrlState = atom<string>({
  key: `encodedUrl`,
  default: '',
});

export const moonScoreState = atom<moonScoreInfo>({
  key: `moonScore`,
  default: {
    isFirstAccess: 0,
    isCoreTimeParticipate: 0,
    isCapture: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const todayState = atom<string>({
  key: `todayState`,
  default: getToday(),
});
