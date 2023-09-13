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

export const getRoomList = async () => {
  try {
    const { data } = await client.get('/room/list?memberId=1');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMyRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list?memberId=1');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLeaderRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list/leader?memberId=1');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getApplyRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list/apply?memberId=1');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
