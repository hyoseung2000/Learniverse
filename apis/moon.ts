import getToday from '@/utils/getToday';

import { client } from './axios';

export const getMoon = async () => {
  try {
    const { data } = await client.get(`/member/moon/list?memberId=1`);
    return data.data.moons;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMoon = async (curScore: number) => {
  try {
    if (curScore >= 4) return null;
    const data = await client.post(`/member/moon/add`, {
      memberId: 1,
      moonDate: getToday(),
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.response?.data.message);
    return err.response?.data.message;
  }
};
