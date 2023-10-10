import { PostDiscussInfo, PostIssueInfo } from '@/types/studyroom';

import { client } from './axios';

export const CreateIssue = async (PostIssueData: PostIssueInfo) => {
  try {
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
    return data.data.issues;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getIssueInfo = async (issueId: number) => {
  try {
    const { data } = await client.get(`/room/issue?issueId=${issueId}`);
    return data;
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

export const postDiscuss = async (PostDiscussData: PostDiscussInfo) => {
  try {
    const { data } = await client.post(
      `room/discussion/create`,
      PostDiscussData,
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteIssue = async (issueId: number) => {
  try {
    const { data } = await client.post(`room/issue/update`, {
      issueId,
    });
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
