"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import Aside from "./Aside";
import Header from "./Header";
import { getUserRequest } from "@service/request/user/getUserRequest";

const Settings = () => {
  // Fetch user details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserRequest,
  });


  return (
    <div>
      <Aside />
      <Header />
      <div className="lg:ml-[200px]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-6">
            Update Profile
          </h1>

          {/* Loading and Error Handling */}
          {isLoading && (
            <p className="text-center text-gray-600">Loading user details...</p>
          )}
          {isError && (
            <p className="text-center text-red-500">Error: {error.message}</p>
          )}

          {!isLoading && !isError && data && (
            <Formik
              initialValues={{
                fullname: data.fullname || "",
                phone: data.phone || "",
                email: data.email || "",
                age: data.age || "",
                weight: data.weight || "",
                height: data.height || "",
                gender: data.gender || "",
                about: data.about || "",
              }}
              onSubmit={(values) => {
                console.log("Updated Information:", values);
                alert("Settings updated successfully!");
              }}
            >
              {({ values }) => (
                <Form className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Field
                      type="text"
                      name="fullname"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                      disabled
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Field
                        type="tel"
                        name="phone"
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Age</label>
                      <Field
                        type="number"
                        name="age"
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Weight (kg)
                      </label>
                      <Field
                        type="number"
                        name="weight"
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Height (cm)
                      </label>
                      <Field
                        type="number"
                        name="height"
                        className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                        disabled
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Gender</label>
                    <Field
                      type="text"
                      name="gender"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                      disabled
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">About</label>
                    <Field
                      as="textarea"
                      name="about"
                      className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                      rows="4"
                      disabled
                    />
                  </div>
                  <button type="submit" className="login-btn font-bold">
                    Update Profile
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
