import { CreateCaptureTimeInfo } from '@/types/capture';

import { client, media } from './axios';

export const createToken = async (memberId: number, token: string) => {
  try {
    const { data } = await client.post(`/room/alarm/createToken`, {
      memberId,
      token,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createCaptureTime = async (
  createCaptureTimeInfo: CreateCaptureTimeInfo,
) => {
  try {
    const { data } = await media.post(
      `/createCaptureTime`,
      createCaptureTimeInfo,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCaptureTime = async (coreTimeId: number) => {
  try {
    const { data } = await media.get(
      `/getCaptureTime?coreTimeId=${coreTimeId}`,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getServerTime = async () => {
  try {
    const { data } = await media.get('/getServerTime');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPresignedUrl = async (fileName: string) => {
  try {
    const data = await media.get(`/presigned-url?fileName=${fileName}`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
