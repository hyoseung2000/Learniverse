import { PostStudyRoomInfo } from '@/types/studyroom';

import { client } from './axios';

export const createRoom = async (postRoomData: PostStudyRoomInfo) => {
  try {
    const { data } = await client.post('/room/create', postRoomData);
    return data.data.encoded;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(`/room/list?memberId=${memberId}`);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMyRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(`/member/room/list?memberId=${memberId}`);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLeaderRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(
      `/member/room/list/leader?memberId=${memberId}`,
    );
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getApplyRoomList = async (memberId: number) => {
  try {
    const { data } = await client.get(
      `/member/room/list/apply?memberId=${memberId}`,
    );
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
