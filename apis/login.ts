import { client } from './axios';

export const getInterestRoomLists = async () => {
  try {
    const { data } = await client.get(`room/create/interest`);
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
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
