import {
  PostIssueInfo,
  PostNoticeInfo,
  PostWorkSpaceInfo,
} from '@/types/studyroom';

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
    console.log(data.data);
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
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getStudyroomWorkSpace = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/info/workspace?roomId=${roomId}`);
    console.log(data.data);
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
    console.log(err);
    throw err;
  }
};

export const postNotice = async (PostNoticeData: PostNoticeInfo) => {
  try {
    const { data } = await client.post(`/room/board/create`, PostNoticeData);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getNoticeList = async (roomId: number) => {
  try {
    const { data } = await client.get(`/room/boards?roomId=${roomId}`);
    console.log(data);
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
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const CreateIssue = async (PostIssueData: PostIssueInfo) => {
  try {
    console.log(PostIssueData);
    const { data } = await client.post(`/room/issue/create`, PostIssueData);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIssueList = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/issues?roomId=${roomId}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIssueInfo = async (issueId: number) => {
  try {
    const { data } = await client.get(`/room/issue?issueId=${issueId}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
