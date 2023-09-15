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
