import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { ProfileDataInfo } from '@/types/member';

const useGetMemberProfile = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<ProfileDataInfo>>(
    `/member/profile?memberId=${memberId}`,
    mainGetFetcher,
  );

  return {
    profile: data?.data?.member,
    isLoading,
    isError: error,
  };
};

export default useGetMemberProfile;
