import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const encodedUrlState = atom<string>({
  key: `encodedUrl`,
  default: '',
});
