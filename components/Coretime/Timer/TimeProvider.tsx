import React, { useEffect, useMemo, useState } from 'react';

import TimeContext from './TimeContext';

const TIMER = 6000;

interface TimeProviderProps {
  children: React.ReactNode;
}

const TimeProvider: React.FC<TimeProviderProps> = ({ children }) => {
  const [seconds, setSeconds] = useState(TIMER);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 1) {
          clearInterval(timer);
          alert('코어타임이 끝났습니다.');
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours} : ${String(minutes).padStart(2, '0')} : ${String(
      remainingSeconds,
    ).padStart(2, '0')}`;
  }, [seconds]);

  const value = useMemo(
    () => ({
      formattedTime,
    }),
    [formattedTime],
  );

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
