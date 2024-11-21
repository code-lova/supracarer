"use client";
import React, { useState } from "react";
import AdminAside from "./AdminAside";
import AdminHeader from "./AdminHeader";
import Link from "next/link";

const Clients = () => {
  const [dropdownIndex, setDropdownIndex] = useState(null);

  const toggleDropdown = (index) => {
    setDropdownIndex(dropdownIndex === index ? null : index);
  };


  return (
    <div>
      <AdminAside />
      <AdminHeader />
      <div className="lg:ml-[300px] mt-32 lg:mt-10 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4 text-center"> Supracarer Client List</h1>
        <table className="min-w-full lg:min-w-[1000px] border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
                Patient Name
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
                Patient ID
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
                Nurse Assigned
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
                Location
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
                Date Checked In
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">
                Status
              </th>
              <th className="border border-gray-300 px-4 py-2 bg-cyan-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                <Link href="/client/profile">Victor Omale</Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">002326</td>
              <td className="border border-gray-300 px-4 py-2">Nurse Peace</td>
              <td className="border border-gray-300 px-4 py-2">Accra</td>
              <td className="border border-gray-300 px-4 py-2">20/11/2024</td>
              <td className="border border-gray-300 px-4 py-2">Pending</td>
              <td className="border border-gray-300 px-4 py-2"> <Link href="/">🖉</Link> <Link  className="ml-2" href="/">👁️</Link> <Link className="ml-2" href="/">🗑️</Link></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
