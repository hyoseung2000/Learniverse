import axios from 'axios';

import { media } from './axios';

export const getPresignedUrl = async () => {
  try {
    const data = await media.get('/presigned-url');
    return data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// eslint-disable-next-line consistent-return
export const putFile = async (presignedUrl: string, file: File) => {
  try {
    const data = await axios.put(`${presignedUrl}`, file);
    return data;
  } catch (error) {
    console.error(error);
  }
};
