import { client } from './axios';

export const decodeRoomId = async (encodedUrl: string) => {
  try {
    const { data } = await client.get(`/room/decode?encoded=${encodedUrl}`);
    return data.data.roomId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRoomInfo = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.get(
      `/room/info?roomId=${roomId}&memberId=${memberId}`,
    );
    console.log(data.data);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const applyRoom = async (roomId: number, memberId: number) => {
  try {
    console.log(roomId, memberId);
    const { data } = await client.post(`/room/member/apply`, {
      roomId,
      memberId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCoretimeList = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/core/list?roomId=${roomId}`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
