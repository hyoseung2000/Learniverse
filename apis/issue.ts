import axios from 'axios';

import {
  ModifyDiscussInfo,
  PostDiscussInfo,
  PostIssueInfo
} from '@/types/studyroom';

import { client } from './axios';

export const createIssue = async (PostIssueData: PostIssueInfo) => {
  try {
    const { data } = await client.post(`/room/issue/create`, PostIssueData);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err))
      if (err.response?.status === 400) {
        return 400;
      }
    return err;
  }
};

export const getIssueList = async (roomId: number) => {
  try {
    const { data } = await client.get(`room/issues?roomId=${roomId}`);
    return data.data.issues;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIssueInfo = async (issueId: number) => {
  try {
    const { data } = await client.get(`/room/issue?issueId=${issueId}`);
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getDiscussions = async (issueId: number) => {
  try {
    const { data } = await client.get(`room/discussions?issueId=${issueId}`);
    return data.data.opinions;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const postDiscuss = async (postDiscussData: PostDiscussInfo) => {
  try {
    const { data } = await client.post(
      `room/discussion/create`,
      postDiscussData,
    );
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteIssue = async (issueId: number) => {
  try {
    const { data } = await client.post(`room/issue/close`, {
      issueId,
    });
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const modifyIssueDiscuss = async (
  postDiscussData: ModifyDiscussInfo,
) => {
  try {
    const { data } = await client.post(`/room/issue/update`, postDiscussData);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const changeApplyState = async (opinionId: number) => {
  try {
    const { data } = await client.post(`/room/discussion/apply`, { opinionId });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
