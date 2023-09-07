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

export const getRoomInfo = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/info?roomId=${roomId}`);
    return data.data.info;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
