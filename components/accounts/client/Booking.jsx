"use client";
import React, { useState } from "react";


const Booking = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    contactPhone: "",
    contactEmail: "",
    address: "",
    patientAge: "",
    patientGender: "",
    medicalCondition: "",
    serviceRequired: "",
    appointmentDate: "",
    appointmentTime: "",
    duration: "",
    specialRequests: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="lg:ml-[200px]">

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Book an Appointment
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="clientName"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.clientName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="contactPhone"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="contactEmail"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="patientAge"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.patientAge}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Gender</label>
              <select
                name="patientGender"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.patientGender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Medical Condition
            </label>
            <textarea
              name="medicalCondition"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.medicalCondition}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Service Required</label>
            <select
              name="serviceRequired"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.serviceRequired}
              onChange={handleChange}
              required
            >
              <option value="">Select a Service</option>
              <option value="Wound Care">Wound Care</option>
              <option value="Catheter Care">Catheter Care</option>
              <option value="Mental Health Support">
                Mental Health Support
              </option>
              <option value="NCD Management">NCD Management</option>
              <option value="Patient Escort">Patient Escort</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Preferred Date</label>
              <input
                type="date"
                name="appointmentDate"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.appointmentDate}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Preferred Time</label>
              <input
                type="time"
                name="appointmentTime"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.appointmentTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Duration (in hours)
            </label>
            <input
              type="number"
              name="duration"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Special Requests</label>
            <textarea
              name="specialRequests"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.specialRequests}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="login-btn font-bold">
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
