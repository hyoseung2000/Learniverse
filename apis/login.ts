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
