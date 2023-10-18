import {
  ModifyNoticeInfo,
  PostNoticeInfo,
  PostWorkSpaceInfo,
} from '@/types/studyroom';

import { client } from './axios';

export const encodeRoomId = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/encode?roomId=${roomId}`);
    return data.data.encoded;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

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
    return data.data.rooms;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getLanguages = async () => {
  try {
    const { data } = await client.get('/room/languages');
    return data.data.languages;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const applyRoom = async (roomId: number, memberId: number) => {
  try {
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
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postWorkspace = async (PostWorkSpaceData: PostWorkSpaceInfo) => {
  try {
    const { data } = await client.post(
      `/room/workspace/update`,
      PostWorkSpaceData,
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getStudyroomWorkSpace = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/info/workspace?roomId=${roomId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getStudyroomName = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/info/roomName?roomId=${roomId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postNotice = async (PostNoticeData: PostNoticeInfo) => {
  try {
    const { data } = await client.post(`/room/board/create`, PostNoticeData);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getNoticeList = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/boards?roomId=${roomId}`);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const DeleteNotice = async (boardId: number) => {
  try {
    const { data } = await client.delete(
      `/room/board/delete?boardId=${boardId}`,
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const ModifyNotice = async (ModifyNoticeData: ModifyNoticeInfo) => {
  try {
    const { data } = await client.post(`/room/board/update`, ModifyNoticeData);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
