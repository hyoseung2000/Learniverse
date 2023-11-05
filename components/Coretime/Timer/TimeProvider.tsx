import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { roomIdState } from '@/recoil/atom';

import TimeContext from './TimeContext';

interface TimeProviderProps {
  children: React.ReactNode;
  coreEndTime: Date;
}

const TimeProvider: React.FC<TimeProviderProps> = ({
  children,
  coreEndTime,
}) => {
  const router = useRouter();
  const roomId = useRecoilValue(roomIdState);
  const endTime = new Date(coreEndTime).getTime();

  const [seconds, setSeconds] = useState<number>(() => {
    const now = new Date().getTime();
    return Math.floor((endTime - now) / 1000);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = Math.floor((endTime - now) / 1000);

      if (timeLeft < 0) {
        clearInterval(interval);
        alert('코어타임이 끝났습니다.');
        router.push(`/studyroom/${roomId}`);
      } else {
        setSeconds(timeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, roomId, router]);

  const formattedTime = useMemo(() => {
    if (Number.isNaN(seconds)) {
      return '00 : 00 : 00';
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(
      2,
      '0',
    )} : ${String(remainingSeconds).padStart(2, '0')}`;
  }, [seconds]);

  const value = useMemo(() => ({ formattedTime }), [formattedTime]);

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
