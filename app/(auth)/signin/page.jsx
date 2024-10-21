"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';


const page = () => {

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <div className='flex flex-row items-center justify-center'>
         
          <h1 className='text-2xl font-bold mb-1 text-center uppercase blue_gradient'>Welcome Back </h1>

        </div>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

        
        <form className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input 
              type='email' 
              id='email' 
              className='login-form-input' 
              placeholder='you@example.com'
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input 
              type='password' 
              id='password' 
              className='login-form-input' 
              placeholder='••••••••' 
              required
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input 
                id='remember-me' 
                type='checkbox' 
                className='h-4 w-4  rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div>
              <Link href='#' className='text-sm text-custom-green hover:text-green-700'>
                Forgot password?
              </Link>
            </div>
          </div>

          <button type='submit' className='login-btn'>
            Login
          </button>


        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>Or login with</p>
          <button className='mt-4 w-full bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-dark-yellow hover:text-black transition duration-300 flex items-center justify-center'>
            <Image 
              src="/assets/icons/google.svg"
              width={30}
              height={30}
              alt='google'
              className='object-contain'
            />
            <span>Google</span>
          </button>
        </div>

        <div className='mt-4 flex flex-row justify-between'>
          <Link href="/" className='flex items-center text-custom-green hover:text-green-700 transition-colors duration-300'>
            <span className='mr-2'>&#8592;</span> 
            <p>Go Back</p>
          </Link>

          <Link href="/signup" className='flex items-center text-custom-green hover:text-green-700 transition-colors duration-300'>
            <p>SignUp</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default page;
