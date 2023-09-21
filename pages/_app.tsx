/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';

import Head from 'next/head';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { Header } from '@/components/Common/Header';
import { GlobalStyle } from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            // console.log('SW registered: ', registration);
          },
          (err) => {
            // console.log('SW registration failed: ', err);
          },
        );
      });
    }
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
          <Head>
            <title>LearniVerse</title>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <Header />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    )
  );
}
