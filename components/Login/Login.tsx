import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const token = params.get('token');

    if (token === null) {
      console.log(params);
      router.push('/');
      return;
    }
    try {
      console.log(token);
      const payload = jwtDecode(token);
      console.log(payload);
      router.push('/home');
    } catch (err) {
      console.error(err);
      router.push('/');
    }
  }, []);

  return <div>Login component</div>;
};

export default Login;
