import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { IssueGetInfo } from '@/types/studyroom';

const useGetIssueInfo = (issueId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<IssueGetInfo>>(
    `/room/issue?issueId=${issueId}`,
    mainGetFetcher,
  );

  return {
    issue: data?.data.issue,
    issueCode: data?.data.gitCode,
    isLoading,
    isError: error,
  };
};

export default useGetIssueInfo;
