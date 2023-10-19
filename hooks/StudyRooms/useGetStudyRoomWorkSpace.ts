import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { WorkSpaceInfo } from '@/types/studyroom';

const useGetStudyRoomWorkSpace = (roomId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<WorkSpaceInfo>>(
    `/room/info/workspace?roomId=${roomId}`,
    mainGetFetcher,
  );

  return {
    workSpaceList: data?.data,
    isLoading,
    isError: error,
  };
};

export default useGetStudyRoomWorkSpace;
