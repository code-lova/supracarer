import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="p-12 text-center">
      <h1 className="text-red-400 text-4xl">Permission Denied</h1>
      <p className="text-2xl">
        You dont have permission to veiw this resource...
      </p>
      <Link href="/redirect">
        <p className="text-custom-green hover:text-dark-yellow font-bold text-xl py-6">
          <span className="mr-2">&#8592;</span>
          Go back home
        </p>
      </Link>
      <p className="text-[300px] font-bold">403</p>
    </div>
  );
};

export default page;
