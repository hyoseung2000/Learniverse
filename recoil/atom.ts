import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// 예시1
export const exState = atom<number>({
  key: `ex`,
  default: 0,
});

// 예시2. 페이지 이동 시에도 전역 상태 유지해야 하는 경우 persistAtom 사용
export const exState2 = atom<string>({
  key: `ex2`,
  default: '',
  effects_UNSTABLE: [persistAtom],
});
