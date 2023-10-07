/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { Header } from '@/components/Common/Header';
import { ServiceWorkerManager } from '@/hooks/FCM';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  // const [captureTime, setIsCaptureTime] = useRecoilState(captureTimeState);

  useEffect(() => {
    setIsClient(true);
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js').then(
    //       (registration) => {
    //         console.log('SW registered: ', registration);
    //       },
    //       (err) => {
    //         console.log('SW registration failed: ', err);
    //       },
    //     );
    //     navigator.serviceWorker.register('/firebase-messaging-sw.js').then(
    //       (registration) => {
    //         console.log('FCM registered: ', registration);
    //       },
    //       (err) => {
    //         console.log('FCM registration failed: ', err);
    //       },
    //     );
    //     navigator.serviceWorker.addEventListener('message', (event) => {
    //       if (event.data.type === 'FCM_MESSAGE_RECEIVED') {
    //         setIsCaptureTime((prev) => prev + 1);
    //         console.log(captureTime);
    //       }
    //     });
    //   });
    // }
  }, []);

  if (!isClient) {
    return null;
  }
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    isClient && (
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ServiceWorkerManager />
          <Head>
            <title>LearniVerse</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    )
  );
}
