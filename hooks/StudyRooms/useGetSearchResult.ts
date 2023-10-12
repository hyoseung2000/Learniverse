/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable prettier/prettier */
import { AxiosResponse } from 'axios';
import useSWRInfinite from 'swr/infinite';

import { mainGetFetcher } from '@/apis/axios';
import { StudyRoomInfo, StudyRoomListInfo } from '@/types/studyroom';

const useGetSearchResult = (
  keyword: string,
  memberId: number,
  page: number,
  searchType: string,
) => {
  const getKey = (
    pageIndex: number,
    previousPageData: AxiosResponse<StudyRoomListInfo> | null,
  ) => {
    if (previousPageData && !previousPageData.data.rooms.length) return null;

    return searchType === 'hashtag'
      ? `/room/search/hashtag?hashtag=${keyword}&memberId=${memberId}&page=${pageIndex}`
      : `/room/search?search=${keyword}&memberId=${memberId}&page=${pageIndex}`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<
    AxiosResponse<StudyRoomListInfo>
  >(getKey, mainGetFetcher);

  const rooms: StudyRoomInfo[] = data
    ? [].concat(...data.map((res: any) => res.data.rooms))
    : [];
  const getNextData = () => setSize(size + 1);

  return {
    resultRoomList: rooms,
    getNextData,
    isResultRoomListLoading: isLoading,
    isError: error,
  };
};

export default useGetSearchResult;
