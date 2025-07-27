"use client";
import React, { useState } from "react";
import ClientDetailsModal from "./client-kit/ClientDetailsModal";
import UpdateClientModal from "./client-kit/UpdateClientModal";
import { SmallBtn } from "@components/core/button";
import { GrUpdate } from "react-icons/gr";
import { TbListDetails } from "react-icons/tb";
import StatusPill from "@components/core/StatusPill";

const mockPatients = [
  {
    id: 1,
    name: "John Doe",
    age: 34,
    region: "Greater Accra",
    status: "Confirmed",
    bookingDate: "2025-07-17",
  },
  {
    id: 2,
    name: "Amma Owusu",
    age: 28,
    region: "Ashanti",
    status: "Ongoing",
    bookingDate: "2025-07-16",
  },
  {
    id: 3,
    name: "Kwame Boateng",
    age: 45,
    region: "Eastern",
    status: "Done",
    bookingDate: "2025-07-15",
  },
  {
    id: 4,
    name: "Yaa Asantewaa",
    age: 39,
    region: "Central",
    status: "Confirmed",
    bookingDate: "2025-07-14",
  },
  {
    id: 5,
    name: "Kofi Mensah",
    age: 50,
    region: "Northern",
    status: "Ongoing",
    bookingDate: "2025-07-13",
  },
  {
    id: 6,
    name: "Akua Serwaa",
    age: 31,
    region: "Volta",
    status: "Done",
    bookingDate: "2025-07-12",
  },
  {
    id: 7,
    name: "Nana Kofi",
    age: 27,
    region: "Upper East",
    status: "Confirmed",
    bookingDate: "2025-07-11",
  },
  {
    id: 8,
    name: "Kojo Asamoah",
    age: 36,
    region: "Western",
    status: "Ongoing",
    bookingDate: "2025-07-10",
  },
  {
    id: 9,
    name: "Afia Nyarko",
    age: 33,
    region: "Bono East",
    status: "Done",
    bookingDate: "2025-07-09",
  },
  {
    id: 10,
    name: "Yaw Darko",
    age: 42,
    region: "Savannah",
    status: "Confirmed",
    bookingDate: "2025-07-08",
  },
];

const statusClass = {
  Confirmed: "bg-blue-100 text-blue-700",
  Ongoing: "bg-yellow-100 text-yellow-700",
  Done: "bg-green-100 text-green-700",
};

const Clients = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const handleUpdate = (updatedPatient) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
    setShowUpdate(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredPatients = patients.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesName && matchesStatus;
  });

  return (
    <div className="pageContainer">
      <div className="w-full h-full xl:h-[669px] overflow-x-auto bg-white rounded-3xl shadow-md px-5 py-6 mb-6 md:mb-0">
        <h2 className="text-xl font-bold text-tranquil-teal mb-6">
          See list of Patients
        </h2>
        <div className="flex flex-wrap gap-4 mb-4 items-center">
          <input
            type="text"
            placeholder="Search by name..."
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="form-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm text-left border border-gray-200">
            <thead className="bg-custom-green text-white text-center">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Region</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date of Booking</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-center text-slate-gray">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-t">
                  <td className="px-4 py-3">{patient.name}</td>
                  <td className="px-4 py-3">{patient.age}</td>
                  <td className="px-4 py-3">{patient.region}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={patient.status} />
                  </td>
                  <td className="px-4 py-3">{patient.bookingDate}</td>
                  <td className="px-4 py-3 space-x-2 flex justify-center items-center">
                    <SmallBtn
                      onClick={() => {
                        setSelectedPatient(patient);
                        setShowDetails(true);
                      }}
                      children="Details"
                      color="gray"
                      icon={<TbListDetails />}
                    />

                    <SmallBtn
                      onClick={() => {
                        setSelectedPatient(patient);
                        setShowUpdate(true);
                      }}
                      icon={<GrUpdate />}
                      children="Update"
                      color="darkblue"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination (static placeholder) */}
          <div className="mt-6 flex justify-end space-x-2">
            <button className="px-3 py-1 text-sm bg-slate-gray text-white rounded hover:bg-haven-blue">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-haven-blue text-white rounded">
              1
            </button>
            <button className="px-3 py-1 text-sm bg-slate-gray text-white rounded hover:bg-haven-blue">
              2
            </button>
            <button className="px-3 py-1 text-sm bg-slate-gray text-white rounded hover:bg-haven-blue">
              3
            </button>
            <button className="px-3 py-1 text-sm bg-slate-gray text-white rounded hover:bg-haven-blue">
              Next
            </button>
          </div>
        </div>
      </div>

      <ClientDetailsModal
        patient={selectedPatient}
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
      />

      <UpdateClientModal
        patient={selectedPatient}
        isOpen={showUpdate}
        onClose={() => setShowUpdate(false)}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default Clients;
