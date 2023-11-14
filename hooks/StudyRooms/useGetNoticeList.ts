import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { NoticeListInfo } from '@/types/studyroom';

const useGetNoticeList = (roomId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<NoticeListInfo>>(
    `/room/boards?roomId=${roomId}`,
    mainGetFetcher,
  );

  return {
    noticeList: data?.data.boards,
    isLoading,
    isError: error,
  };
};

export default useGetNoticeList;
