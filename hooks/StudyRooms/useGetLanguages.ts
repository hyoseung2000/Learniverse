import { AxiosResponse } from 'axios';
import useSWR from 'swr';

import { mainGetFetcher } from '@/apis/axios';
import { LanguageDataInfo } from '@/types/studyroom';

const useGetLanguages = () => {
  const { data, error, isLoading } = useSWR<AxiosResponse<LanguageDataInfo>>(
    `/room/languages`,
    mainGetFetcher,
  );

  return {
    languages: data?.data.languages,
    isLoading,
    isError: error,
  };
};

export default useGetLanguages;
