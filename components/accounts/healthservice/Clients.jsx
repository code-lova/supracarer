import React from "react";
import Link from "next/link";

const Clients = () => {
  return (
    <div className="mt-32 lg:mt-10 overflow-x-auto">
      <table className="min-w-full lg:min-w-[1000px] border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
              Name
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
              Age
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
              Gender
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
              Location
            </th>
            <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-gray-300 px-4 py-2">
              <Link href="/client/profile">Victor Omale</Link>
            </td>
            <td className="border border-gray-300 px-4 py-2">26</td>
            <td className="border border-gray-300 px-4 py-2">Male</td>
            <td className="border border-gray-300 px-4 py-2">Accra</td>
            <td className="border border-gray-300 px-4 py-2">20/11/2024</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
