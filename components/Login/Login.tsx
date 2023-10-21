import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { getLoginInfo, postLog } from '@/apis/login';
import { memberIdState } from '@/recoil/atom';

const Login = () => {
  const router = useRouter();

  const [memberId, setMemberId] = useRecoilState(memberIdState);

  const postLogin = async () => {
    await postLog(memberId);
  };

  const handleLogin = async () => {
    const data = await getLoginInfo(memberId);
    const { memberFirst, refreshToken } = data!;
    localStorage.setItem('refreshToken', refreshToken);
    // eslint-disable-next-line eqeqeq
    router.push(memberFirst !== 'true' ? '/signup' : '/home');
    postLogin();
  };

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const token = params.get('token');

    if (token === null) {
      router.push('/');
      return;
    }
    try {
      localStorage.setItem('accessToken', token);
      const payload: JwtPayload = jwtDecode(token);
      const { sub } = payload;
      setMemberId(Number(sub));
      handleLogin();
    } catch (err) {
      console.error(err);
      router.push('/');
    }
  }, [memberId]);

  return <div />;
};

export default Login;
