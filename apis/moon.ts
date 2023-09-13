import getToday from '@/utils/getToday';

import { client } from './axios';

export const getMoon = async () => {
  try {
    const { data } = await client.get(`/member/moon/list?memberId=1`);
    console.log(data.data.moons);
    return data.data.moons;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMoon = async (curScore: number) => {
  try {
    if (curScore >= 4) return;

    const data = await client.post(`/member/moon/add`, {
      memberId: 1,
      moonDate: getToday(),
      // moonDate: '2023-08-20',
    });
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err);
    console.log(err.response?.data.status);
    // eslint-disable-next-line consistent-return
    return err.response?.data.status;
  }
};
