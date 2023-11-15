import { LoginInfo } from '@/types/login';

import { client } from './axios';

export const getLoginInfo = async (memberId: number): Promise<LoginInfo> => {
  try {
    const { data } = await client.get(`/member/first?memberId=${memberId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getInterestRoomLists = async () => {
  try {
    const { data } = await client.get(`/room/create/interest`);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postInterests = async (memberId: number, roomIds: number[]) => {
  try {
    const { data } = await client.post(`/room/create/interest`, {
      memberId,
      roomIds,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postLog = async (memberId: number) => {
  try {
    const { data } = await client.post(`/member/login`, memberId);
    return data;
  } catch (err) {
    console.error(err);
    return err;
    // throw err;
  }
};

export const logout = async () => {
  try {
    const { data } = await client.post(`/logout`, null);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
