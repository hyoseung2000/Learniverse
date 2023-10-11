import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomListInfo } from '@/types/studyroom';

const useGetLeaderStudyRoomList = (memberId: number) => {
  const { data, error, isLoading } = useSWR<AxiosResponse<StudyRoomListInfo>>(
    `/member/room/list/leader?memberId=${memberId}`,
    mainGetFetcher,
  );
  console.log(data);

  return {
    leaderStudyRoomList: data?.data.rooms,
    isLeaderRoomLoading: isLoading,
    isError: error,
  };
};

export default useGetLeaderStudyRoomList;
