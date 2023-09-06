import { client } from "./axios";

export const getRoomList = async () => {
  try {
    const { data } = await client.get('/room/list');
    console.log(data.data.rooms);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMyRoomList = async () => {
  try {
    const { data } = await client.get('/member/room/list');
    console.log(data.data.rooms);
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
