/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from "next/head";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import { Header } from "@/components/Common/Header";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  // useEffect(() => {
  //   function adjustPageZoom() {
  //     const screenWidth = window.innerWidth;
  //     const zoomRatio = 1024 / screenWidth; // MEMO :: 1920px가 기준 화면 너비

  //     document.body.style.zoom = zoomRatio;
  //   }
  //   adjustPageZoom();

  //   // 페이지 로드 시 및 화면 크기 변경 시 확대 적용
  //   window.addEventListener('load', adjustPageZoom);
  //   window.addEventListener('resize', adjustPageZoom);
  // }, []);

  return (
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
  );
}
