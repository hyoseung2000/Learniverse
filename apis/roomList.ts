import { postStudyRoomInfo } from '@/types/studyroom';

import { client } from './axios';

export const createRoom = async (postRoomData: postStudyRoomInfo) => {
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
    const { data } = await client.get('/room/list');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMyRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLeaderRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list/leader');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getApplyRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list/apply');
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
