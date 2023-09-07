import { useRouter } from 'next/router';
import React from 'react';

import { ApplyContainer } from '@/containers/Apply';

const index = () => {
  const router = useRouter();
  const { encodedUrl } = router.query;

  return encodedUrl && <ApplyContainer url={encodedUrl as string} />;
};

export default index;
