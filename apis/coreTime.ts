import { PostCoreTimeInfo } from '@/types/studyroom';

import { client } from './axios';

export const createCoretime = async (postCoreTimeData: PostCoreTimeInfo) => {
  try {
    console.log(postCoreTimeData);
    const { data } = await client.post(`/room/core/create`, postCoreTimeData);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const DeleteCoretime = async (coreTimeId: number) => {
  try {
    const { data } = await client.delete(
      `/room/core/delete?coreTimeId=${coreTimeId}`,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCoretimeID = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/core/id?roomId=${roomId}`);
    console.log(data.data.coreTimeId);
    return data.data.coreTimeId;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
