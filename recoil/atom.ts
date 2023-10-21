import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import getToday from '@/utils/getToday';

const { persistAtom } = recoilPersist();

const resetTime = new Date();
resetTime.setHours(0, 0, 0, 0);

export const memberIdState = atom<number>({
  key: `memberId`,
  effects_UNSTABLE: [persistAtom],
});

export const fcmTokenState = atom<string>({
  key: `fcmTokenState`,
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export const captureTimeState = atom<number>({
  key: `captureTimeState`,
  default: 0,
});

export const encodedUrlState = atom<string>({
  key: `encodedUrl`,
  default: '',
});

export const moonScoreState = atom<number>({
  key: `moonScore`,
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const todayState = atom<string>({
  key: `today`,
  default: getToday(),
});

export const roomIdState = atom<number>({
  key: `roomId`,
  effects_UNSTABLE: [persistAtom],
});

export const coreTimeIdState = atom<number>({
  key: `coreTimeId`,
  effects_UNSTABLE: [persistAtom],
});

export const issueIdState = atom<number>({
  key: `issueId`,
  effects_UNSTABLE: [persistAtom],
});
