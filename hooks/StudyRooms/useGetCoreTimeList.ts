import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { CoreTimeListInfo } from '@/types/studyroom';

const useGetCoreTimeList = (roomId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<CoreTimeListInfo>>(
    `/room/core/list?roomId=${roomId}`,
    mainGetFetcher,
  );

  return {
    coreTimeList: data?.data.cores,
    isCoreTime: data?.data.isCore,
    isLoading,
    isError: error,
  };
};

export default useGetCoreTimeList;
