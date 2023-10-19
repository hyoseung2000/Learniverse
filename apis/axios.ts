/* eslint-disable no-param-reassign */
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_IP,
  headers: {
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_IP,
  },
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  if (accessToken && refreshToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Refresh = refreshToken;
  }
  return config;
});

// client.interceptors.response.use(
//   function (res) {
//     console.log('response', res);
//     return res;
//   },
//   async (err) => {
//     const {
//       config,
//       response: { status },
//     } = err;
//     if (status === 401) {
//       if (err.response.data.message === '엑세스 토큰 만료') {
//         const originalRequest = config;

//         // 새로운 엑세스 토큰 저장
//         const { accessToken } = err.response.data.data;
//         localStorage.setItem('accessToken', accessToken);
//         originalRequest.headers.authorization = `Bearer ${accessToken}`;
//         // 실패했던 요청 새로운 accessToken으로 재요청
//         return axios(originalRequest);
//       }
//     }
//     console.log('response error', err);
//     return Promise.reject(err);
//   },
// );

const media = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MEDIA_IP,
});

const ai = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AI_IP,
});

const mainGetFetcher = (url: string) => client.get(url).then((res) => res.data);

const mediaGetFetcher = (url: string) => media.get(url).then((res) => res.data);

const aiGetFetcher = (url: string) => ai.get(url).then((res) => res.data);

export { client, media, ai, mainGetFetcher, mediaGetFetcher, aiGetFetcher };
