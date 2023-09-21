import { Dispatch, SetStateAction, useState } from 'react';

import { ConsumeInfo } from '@/types/socket';

type UseVideoSelectorType = [
  string | null,
  Dispatch<SetStateAction<string | null>>,
  (stream: ConsumeInfo) => void,
];

const useVideoSelector = (): UseVideoSelectorType => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleSelectVideo = (stream: ConsumeInfo) => {
    setSelectedVideo(
      selectedVideo === stream.producer_id ? null : stream.producer_id,
    );
  };

  return [selectedVideo, setSelectedVideo, handleSelectVideo];
};

export default useVideoSelector;
