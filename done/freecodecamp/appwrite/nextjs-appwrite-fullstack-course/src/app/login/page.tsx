'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/api/users/login', user);
      console.log('Login succes', res.data);
      toast.success('Login success');
      router.push('/profile');
    } catch (error: any) {
      console.log('Login failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Login'}</h1>
      <label htmlFor='email'>email</label>
      <input
        type='email'
        value={user.email}
        id='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        className='p-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600'
      />

      <label htmlFor='password'>password</label>
      <input
        type='password'
        value={user.password}
        id='password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        className='p-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600'
      />
      {buttonDisabled ? null : (
        <button
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
          onClick={onLogin}
        >
          Login
        </button>
      )}

      <Link href='/signup'>Visit Sign up page</Link>
    </div>
  );
};

export default LoginPage;
