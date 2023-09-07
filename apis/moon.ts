import getToday from '@/utils/getToday';

import { client } from './axios';

export const getMoon = async () => {
  try {
    const { data } = await client.get(`/member/moon/list?memberId=1`);
    // console.log(data);
    return data.data.moons;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addMoon = async () => {
  try {
    const { data } = await client.post(`/member/moon`, {
      memberId: 1,
      moonDate: getToday(),
    });
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
