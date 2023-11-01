import { client } from './axios';

export const getWaitMembers = async (roomId: number) => {
  try {
    const { data } = await client.get(
      `/room/member/list/isWait?roomId=${roomId}`,
    );
    return data.data.members;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const JoinMember = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.post(`/room/member/join`, {
      roomId,
      memberId,
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err.response?.data.status);
    return err.response?.data.status;
  }
};

export const RejectMember = async (roomId: number, memberId: number) => {
  try {
    const { data } = await client.post(`/room/member/reject`, {
      roomId,
      memberId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getRoomMembers = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/member/list?roomId=${roomId}`);
    return data.data.members;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
