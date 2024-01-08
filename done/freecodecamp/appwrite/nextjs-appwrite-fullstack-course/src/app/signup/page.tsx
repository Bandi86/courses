'use client';

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const SignUp = () => {
  
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSignup = async () => {
    try {
      setLoading(true)
      const res = await axios.post('api/users/signup', user)
      console.log("Signup success", res.data)
      router.push('/login')
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'Signup'}</h1>
      <label htmlFor='username'>username</label>
      <input
        type='text'
        value={user.username}
        id='username'
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        className='p-2 border border-gray-300 rounded-lg mb-4 text-black focus:outline-none focus:border-gray-600'
      />
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
      <button
        className='p-2 border border-gray-300 rounded-lg mb-4 text-white focus:outline-none focus:border-gray-600'
        onClick={onSignup}
      >
        {buttonDisabled ? 'No Signup' : 'Signup'}
      </button>
      <Link href='/login'>Visit login page</Link>
    </div>
  );
};

export default SignUp;
