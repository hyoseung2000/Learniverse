import { AxiosResponse } from "axios";
import useSWR from "swr";

import { mainGetFetcher } from "@/apis/axios";
import { StudyRoomListInfo } from "@/types/studyroom";

const useGetSearchResult = (
  keyword: string,
  memberId: number,
  page: number,
  searchType: string,
) => {
  if (!keyword) {
    return {
      resultRoomList: undefined,
      isLoading: false,
      isError: false,
    };
  }

  const endpoint =
    searchType === 'hashtag'
      ? `/room/search/hashtag?hashtag=${keyword}&memberId=${memberId}&page=0`
      : `/room/search?search=${keyword}&memberId=${memberId}&page=0`;

  const { data, error, isLoading } = useSWR<AxiosResponse<StudyRoomListInfo>>(
    endpoint,
    mainGetFetcher,
  );

  return {
    resultRoomList: data?.data.rooms,
    isLoading,
    isError: error,
  };
};

export default useGetSearchResult;
