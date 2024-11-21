import React from "react";
import { DashboardLinks, historyData } from "@constants/index";


const HistoryModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl text-cyan-400 font-bold">History</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-4xl"
            >
              &times;
            </button>
          </div>
  
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 bg-cyan-400">Name</th>
                  <th className="border border-gray-300 px-4 py-2 bg-cyan-400">Date</th>
                  <th className="border border-gray-300 px-4 py-2 bg-cyan-400">Time</th>
                  <th className="border border-gray-300 px-4 py-2 bg-cyan-400">New Values</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">{entry.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.time}</td>
                    <td className="border border-gray-300 px-4 py-2">{entry.bloodPressure}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  export default HistoryModal;
  