"use client";
import { Spinner } from '@components/core/Spinner';
import React, { useEffect }from 'react';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/navigation';


const SuccessPage = () => {
  const { user, isLoading, isError, refetch } = useUser();
  const navigate = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoading) {
        if (!user) {
          // Refetch user if null initially
          await refetch();
        }

        if (user) {
          // Redirect based on role
          switch (user.role) {
            case "client":
              navigate.push("/client");
              break;
            case "nurse":
              navigate.push("/nurse");
              break;
            case "admin":
              navigate.push("/admin");
              break;
            default:
              navigate.push("/signin");
          }
        } else if (isError || user === null) {
          // Redirect to sign-in if error occurs or no user
          navigate.push("/signin");
        }
      }
    };

    handleRedirect();
  }, [user, isLoading, isError, refetch, navigate]);



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-2xl font-bold mb-1 text-center blue_gradient">
            Redirecting you in a sec
        </h1>
      </div>
      <div className='flex justify-center mt-6'>
          <Spinner size='large'/>
      </div>
      <p className='flex justify-center mt-6 font-semibold text-sm'>Please Wait....</p>
    </div>
  </div>
  )
}

export default SuccessPage;