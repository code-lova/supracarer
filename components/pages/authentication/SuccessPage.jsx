import React from "react";
import Link from "next/link";


const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center justify-center">
           
          <h1 className="text-2xl font-bold mb-1 text-center green_gradient">
            Please check your email for verification link
          </h1>

          <h2 className="text-xl font-bold mb-6 text-center py-2 text-slate-gray">Click on the link to verify your email address</h2>
        </div>
        <Link href="/signin">
        <h2 className="text-base font-medium text-custom-green mb-6 text-center mt-2"> {" <- "}Back to Login</h2>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
