import React from 'react';

const UserProfile = ({params}: any) => {
  return (
    <>
      <h1 className='text-center mt-2 text-5xl'>Profile</h1>
    <div className='flex flex-row items-center justify-center min-h-screen py-2'>
      <hr />
      <p className='text-4xl'>Profile page</p>
      <span className='p-2 rounded bg-orange-500 text-black ml-2'>{params.id}</span>
    </div>
    </>
  );
};

export default UserProfile;