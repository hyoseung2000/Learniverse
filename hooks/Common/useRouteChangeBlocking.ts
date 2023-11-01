/* eslint-disable @typescript-eslint/no-throw-literal */
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

const useRouteChangeBlocking = (blockingCallback: () => void) => {
  const router = useRouter();
  const [requestedUrl, setRequestedUrl] = useState<string>('');
  const [isOff, setIsOff] = useState<boolean>(false);

  const isSamePath = useCallback(
    (nextUrl: string) => router.asPath.split('?')[0] === nextUrl.split('?')[0],
    [router.asPath],
  );

  const syncUrlWithRouter = useCallback(() => {
    if (router.asPath !== window.location.pathname) {
      window.history.pushState(null, '', router.asPath);
    }
  }, [router.asPath]);

  const handleRouterChangeStart = useCallback(
    (url: string) => {
      if (isSamePath(url)) {
        return;
      }
      syncUrlWithRouter();
      setRequestedUrl(url);
      blockingCallback();
      if (!isOff) {
        router.events.emit('routeChangeError');
        throw '코어타임 페이지 이탈';
      }
    },
    [router.events, isSamePath, blockingCallback],
  );

  const offRouteChangeBlocking = useCallback(
    (offBlockingCallback?: () => void) => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
      setIsOff(true);
      offBlockingCallback?.();
      if (!requestedUrl) return;
      router.replace(requestedUrl);
    },
    [handleRouterChangeStart, requestedUrl, router],
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouterChangeStart);
    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
    };
  }, [router.events, handleRouterChangeStart]);

  return { offRouteChangeBlocking };
};

export default useRouteChangeBlocking;
