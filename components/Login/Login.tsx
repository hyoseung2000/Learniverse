import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { postLog } from '@/apis/login';
import { memberIdState } from '@/recoil/atom';

const Login = () => {
  const router = useRouter();

  const setMemberId = useSetRecoilState(memberIdState);

  const postLogin = async (memberId: number) => {
    await postLog(memberId);
  };

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const token = params.get('token');

    if (token === null) {
      router.push('/');
      return;
    }
    try {
      localStorage.setItem('access_token', token);
      const payload: JwtPayload = jwtDecode(token);
      const { sub } = payload;
      setMemberId(Number(sub));
      postLogin(Number(sub));
      router.push('/home');
      // router.push('/signup');
    } catch (err) {
      console.error(err);
      router.push('/');
    }
  }, []);

  return <div />;
};

export default Login;
