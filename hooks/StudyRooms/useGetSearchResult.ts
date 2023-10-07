import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomDataInfo } from '@/types/studyroom';

const useGetSearchResult = (hashtag: string, memberId: number, page: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<StudyRoomDataInfo>>(
    `/room/search/hashtag?hashtag=${hashtag}&memberId=${memberId}&page=0`,
    mainGetFetcher,
  );

  return {
    resultRoomList: data?.data.rooms,
    isLoading,
    isError: error,
  };
};

export default useGetSearchResult;


