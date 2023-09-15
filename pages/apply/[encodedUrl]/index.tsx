import { useRouter } from 'next/router';
import React from 'react';

import { ApplyContainer } from '@/containers/Apply';

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const { encodedUrl } = router.query;

  return encodedUrl && <ApplyContainer url={encodedUrl as string} />;
};

export default index;
