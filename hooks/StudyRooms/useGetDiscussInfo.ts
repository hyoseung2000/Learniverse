import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { DiscussListInfo } from '@/types/studyroom';

const useGetDiscussInfo = (issueId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<DiscussListInfo>>(
    `/room/discussions?issueId=${issueId}`,
    mainGetFetcher,
  );

  return {
    discuss: data?.data?.opinions,
    isDiscussLoading: isLoading,
    isError: error,
  };
};

export default useGetDiscussInfo;
