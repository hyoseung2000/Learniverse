import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { IssueListInfo } from '@/types/studyroom';

const useGetIssueList = (roomId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<IssueListInfo>>(
    `/room/issues?roomId=${roomId}`,
    mainGetFetcher,
  );

  return {
    issueList: data?.data?.issues,
    isLoading,
    isError: error,
  };
};

export default useGetIssueList;
