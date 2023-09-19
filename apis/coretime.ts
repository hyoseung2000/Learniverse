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
