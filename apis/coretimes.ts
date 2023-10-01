import axios from 'axios';

import { CaptureInfo, CreateCaptureTimeInfo } from '@/types/capture';
import { PostCoreTimeInfo } from '@/types/studyroom';

import { client, media } from './axios';

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

export const getCoreEndtime = async (coreTimeId: number) => {
  try {
    const { data } = await client.get(
      `/room/core/endTime?coreTimeId=${coreTimeId}`,
    );
    return data.data.coreEndTime;
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

// eslint-disable-next-line consistent-return
export const putFile = async (presignedUrl: string, file: File) => {
  try {
    const data = await axios.put(presignedUrl, file);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createCapture = async (captureInfo: CaptureInfo) => {
  try {
    const data = await media.post(`/createCapture`, captureInfo);
    console.log(data.data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCapture = async (coretimeId: string) => {
  try {
    const data = await media.get(`/getCapture?coreTimeId=${coretimeId}`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
