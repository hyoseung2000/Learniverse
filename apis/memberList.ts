import { client } from "./axios";

export const getWaitMembers = async (roomId: number) => {
  try {
    const { data } = await client.get(
      `/room/member/list/isWait?roomId=${roomId}`,
    );
    console.log(data.data.members);
    return data.data.members;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
