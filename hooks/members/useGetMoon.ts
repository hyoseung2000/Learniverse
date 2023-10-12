import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { MoonDataInfo } from '@/types/member';

const useGetMoon = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<MoonDataInfo>>(
    `/member/moon/list?memberId=${memberId}`,
    mainGetFetcher,
  );
  console.log(data);

  return {
    moons: data?.data.moons,
    isMoonLoading: isLoading,
    isError: error,
  };
};

export default useGetMoon;
