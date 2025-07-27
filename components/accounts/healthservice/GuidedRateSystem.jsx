"use client";
import React, { useState, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  shiftRateBands,
  shiftServiceType,
  hourRateServiceOptions,
} from "@constants/index";
import { useUserContext } from "@context/userContext";
import { guidedRateSchema } from "@schema/healthworker/guidedRate";
import {
  getUserGrs,
  updateUserGrs,
} from "@service/request/healthworker/guidedrate";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoaderButton from "@components/core/LoaderButton";
import toast from "react-hot-toast";
import { FaDoorOpen } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import GrsLoaderSkeleton from "@components/core/skeleton/grs/GrsLoaderSkeleton";

const GuidedRateSystem = () => {
  const { user } = useUserContext();
  const userDetails = user?.data;
  const isNurse = userDetails?.practitioner === "nurse";

  // Query client for cache updates
  const queryClient = useQueryClient();

  // Fetch current user's guided rate system
  const { data: grsData, isLoading } = useQuery({
    queryKey: ["user-grs", userDetails?.id],
    queryFn: () => getUserGrs(userDetails?.id),
    enabled: !!userDetails?.id,
    staleTime: 5 * 60 * 1000,
  });

  // Mutation for updating guided rate system
  const mutation = useMutation({
    mutationFn: updateUserGrs,
    onSuccess: () => {
      toast.success("Guided rate saved successfully");
      queryClient.invalidateQueries({
        queryKey: ["user-grs", userDetails?.id],
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update rate");
    },
  });

  const initialValues = {
    rate_type: "shift",
    nurse_type: "",
    guided_rate: 50,
    care_duration: "2 hours (Live-out)",
    guided_rate_justification: "",
    service_types: [],
  };

  const handleSubmit = (values) => {
    // If practitioner is not nurse, set nurse_type to 'none' before submit
    const submitValues = isNurse ? values : { ...values, nurse_type: "none" };
    mutation.mutate(submitValues);
  };

  return (
    <div className="pageContainer">
      <div className="grid grid-col-1 xl:grid-cols-3 gap-4">
        {/* Left Card */}
        <div className="bg-white col-span-2 xl:col-span-1 xl:h-[669px] shadow-lg rounded-2xl p-3 flex flex-col gap-6  xl:justify-between">
          <div>
            <h3 className="text-lg font-bold text-custom-green mb-2 mt-1 text-center">
              Welcome!
            </h3>
            <p className="text-slate-gray text-center mb-4">
              Set your guided rate for health services. Adjust your preferences
              and see your options on the right.
            </p>
            <div className="flex flex-col items-center justify-center mt-6 xl:mt-4">
              <FaUserDoctor className="text-tranquil-teal text-[110px]" />
            </div>
          </div>
          <div className="mt-0">
            <h4 className="text-base font-semibold text-custom-green mb-2 text-center">
              Your Current Guided Rate
            </h4>
            {isLoading ? (
              <GrsLoaderSkeleton />
            ) : grsData && grsData.grs ? (
              <div className="rounded-xl border border-tranquil-teal/30 bg-tranquil-teal/10 p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-gray">
                    Rate Type:
                  </span>
                  <span className="font-semibold text-tranquil-teal capitalize">
                    {grsData.grs.rate_type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-gray">
                    Nurse Type:
                  </span>
                  <span className="font-semibold text-tranquil-teal capitalize">
                    {grsData.grs.nurse_type || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-gray">
                    Guided Rate:
                  </span>
                  <span className="font-bold text-lg text-custom-green">
                    GHS {grsData.grs.guided_rate}
                  </span>
                </div>
                {/* Platform commission and actual amount */}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-gray">
                    Platform Fee (20%):
                  </span>
                  <span className="font-semibold text-red-500">
                    GHS{" "}
                    {grsData.grs.guided_rate
                      ? (grsData.grs.guided_rate * 0.2).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-gray">
                    You Receive:
                  </span>
                  <span className="font-bold text-lg text-green-700">
                    GHS{" "}
                    {grsData.grs.guided_rate
                      ? (grsData.grs.guided_rate * 0.8).toFixed(2)
                      : "0.00"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-gray">Duration:</span>
                  <span className="font-semibold text-tranquil-teal">
                    {grsData.grs.care_duration}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-medium text-slate-gray">
                    Service Types:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {grsData.grs.service_types &&
                    grsData.grs.service_types.length > 0 ? (
                      grsData.grs.service_types.map((type) => (
                        <span
                          key={type}
                          className="bg-custom-green/10 text-custom-green px-2 py-0.5 rounded text-xs font-medium border border-custom-green/20"
                        >
                          {type}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>
                </div>
                {grsData.grs.guided_rate_justification && (
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-slate-gray">
                      Justification:
                    </span>
                    <span className="italic text-gray-600 text-sm">
                      {grsData.grs.guided_rate_justification}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-6">
                No guided rate set yet.
              </div>
            )}
          </div>
        </div>
        {/* Right Card (Form) */}
        <div className="bg-white h-[669px] shadow-lg rounded-2xl p-6 overflow-x-auto custom-scrollbar col-span-2 mb-4">
          <div className="flex justify-center items-center space-x-2 mb-8">
            <FaDoorOpen className="text-tranquil-teal text-3xl" />
            <h2 className="text-xl font-bold text-center text-custom-green">
              Guided Rate System
            </h2>
          </div>
          <div className="flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-2 text-yellow-800 text-xs">
            <span className="font-semibold">Note:  20% platform fee, will be deducted from your set rate</span>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={guidedRateSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, resetForm }) => {
              const isShift = values.rate_type === "shift";

              let minRate = 50;
              let maxRate = 130;
              if (isShift && values.care_duration) {
                const band = shiftRateBands[values.care_duration];
                if (band) {
                  minRate = band.min;
                  maxRate = band.max;
                }
              } else if (!isShift && values.service_types.length > 0) {
                const nurseType = values.nurse_type;
                const selectedOptions = (
                  hourRateServiceOptions[nurseType] || []
                ).filter((opt) => values.service_types.includes(opt.name));
                if (selectedOptions.length > 1) {
                  minRate = Math.min(...selectedOptions.map((opt) => opt.min));
                  maxRate = Math.max(...selectedOptions.map((opt) => opt.max));
                } else if (selectedOptions.length === 1) {
                  minRate = selectedOptions[0].min;
                  maxRate = selectedOptions[0].max;
                }
              }

              // useEffect for resetForm. Add onChange to Field below.
              React.useEffect(() => {
                resetForm({
                  values: {
                    rate_type: values.rate_type, // keep the new type
                    nurse_type: "",
                    guided_rate: 50,
                    care_duration: "2 hours (Live-out)",
                    guided_rate_justification: "",
                    service_types: [],
                  },
                });
              }, [values.rate_type]); // triggers only when rate_type changes

              // Reset guided_rate to 50 when rate bands change
              React.useEffect(() => {
                setFieldValue("guided_rate", 50);
              }, [
                values.nurse_type,
                values.care_duration,
                values.service_types.length,
              ]);

              return (
                <Form className="space-y-4">
                  {/* Rate Type Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Choose Rate Type
                    </label>
                    <Field
                      as="select"
                      name="rate_type"
                      className="login-form-input"
                    >
                      <option value="shift">Per Shift</option>
                      <option value="hourly">Per Hour</option>
                    </Field>
                    <ErrorMessage
                      name="rate_type"
                      component="div"
                      className="text-red-600 text-xs"
                    />
                  </div>

                  {/* Nurse Type (for nurses only) */}
                  {isNurse && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nurse Type
                      </label>
                      <Field
                        as="select"
                        name="nurse_type"
                        className="login-form-input"
                      >
                        <option value="">Select Nurse Type</option>
                        <option value="RN">Registered Nurse (RN)</option>
                        <option value="NAC">Nursing Assistant (NAC)</option>
                      </Field>
                      <ErrorMessage
                        name="nurse_type"
                        component="div"
                        className="text-red-600 text-xs mt-1"
                      />
                    </div>
                  )}

                  {/* Shift Rate Form */}
                  {isShift && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Shift Duration
                        </label>
                        <Field
                          as="select"
                          name="care_duration"
                          className="login-form-input"
                        >
                          <option value="">Select Shift</option>
                          {Object.keys(shiftRateBands).map((shift) => (
                            <option key={shift} value={shift}>
                              {shift}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="care_duration"
                          component="div"
                          className="text-red-600 text-xs"
                        />
                      </div>

                      {/* For nurses, require nurse_type before showing service types */}
                      {isNurse ? (
                        values.nurse_type ? (
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Service Types
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {shiftServiceType.map((service) => (
                                <div
                                  key={service}
                                  className={`px-3 py-2 rounded-md cursor-pointer border ${
                                    values.service_types.includes(service)
                                      ? "bg-green-100 text-green-700 border-green-600"
                                      : "bg-white text-gray-700 border-gray-300"
                                  }`}
                                  onClick={() => {
                                    const alreadySelected =
                                      values.service_types.includes(service);
                                    const newSelection = alreadySelected
                                      ? values.service_types.filter(
                                          (s) => s !== service
                                        )
                                      : [...values.service_types, service];
                                    setFieldValue(
                                      "service_types",
                                      newSelection
                                    );
                                  }}
                                >
                                  {service}
                                </div>
                              ))}
                            </div>
                            <ErrorMessage
                              name="service_types"
                              component="div"
                              className="text-red-600 text-xs mt-1"
                            />
                          </div>
                        ) : null
                      ) : (
                        // For non-nurses, show service types by default
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Service Types
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {shiftServiceType.map((service) => (
                              <div
                                key={service}
                                className={`px-3 py-2 rounded-md cursor-pointer border ${
                                  values.service_types.includes(service)
                                    ? "bg-green-100 text-green-700 border-green-600"
                                    : "bg-white text-gray-700 border-gray-300"
                                }`}
                                onClick={() => {
                                  const alreadySelected =
                                    values.service_types.includes(service);
                                  const newSelection = alreadySelected
                                    ? values.service_types.filter(
                                        (s) => s !== service
                                      )
                                    : [...values.service_types, service];
                                  setFieldValue("service_types", newSelection);
                                }}
                              >
                                {service}
                              </div>
                            ))}
                          </div>
                          <ErrorMessage
                            name="service_types"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                      )}
                    </>
                  )}

                  {/* Hourly Rate Form */}
                  {!isShift && (
                    <>
                      {/* For nurses, require nurse_type before showing service types */}
                      {isNurse ? (
                        values.nurse_type ? (
                          <div>
                            <label className="block text-sm font-medium mb-1 text-slate-gray">
                              Hourly Service Types (Live-out)
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {(
                                hourRateServiceOptions[values.nurse_type] || []
                              ).map((option) => (
                                <div
                                  key={option.name}
                                  className={`px-3 py-2 rounded-md border cursor-pointer ${
                                    values.service_types.includes(option.name)
                                      ? "bg-green-100 text-green-800 border-green-600"
                                      : "bg-gray-100 text-gray-700 border-gray-300"
                                  }`}
                                  onClick={() => {
                                    const current = values.service_types;
                                    const exists = current.includes(
                                      option.name
                                    );
                                    const updated = exists
                                      ? current.filter((s) => s !== option.name)
                                      : [...current, option.name];
                                    setFieldValue("service_types", updated);
                                  }}
                                >
                                  {option.name}
                                </div>
                              ))}
                            </div>
                            <ErrorMessage
                              name="service_types"
                              component="div"
                              className="text-red-600 text-xs mt-1"
                            />
                          </div>
                        ) : null
                      ) : (
                        // For non-nurses, show all hourly service types by default
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Hourly Service Types (Live-out)
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {(hourRateServiceOptions["RN"] || [])
                              .concat(hourRateServiceOptions["NAC"] || [])
                              .map((option) => (
                                <div
                                  key={option.name}
                                  className={`px-3 py-2 rounded-md border cursor-pointer ${
                                    values.service_types.includes(option.name)
                                      ? "bg-green-100 text-green-800 border-green-600"
                                      : "bg-gray-100 text-gray-700 border-gray-300"
                                  }`}
                                  onClick={() => {
                                    const current = values.service_types;
                                    const exists = current.includes(
                                      option.name
                                    );
                                    const updated = exists
                                      ? current.filter((s) => s !== option.name)
                                      : [...current, option.name];
                                    setFieldValue("service_types", updated);
                                  }}
                                >
                                  {option.name}
                                </div>
                              ))}
                          </div>
                          <ErrorMessage
                            name="service_types"
                            component="div"
                            className="text-red-600 text-xs mt-1"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Duration (2 hours default)
                        </label>
                        <Field
                          type="text"
                          disabled
                          name="care_duration"
                          className="login-form-input"
                        />
                      </div>
                    </>
                  )}

                  {/* Rate Slider */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Set Your Rate (GHS {minRate} - GHS {maxRate})
                    </label>
                    <Field name="guided_rate">
                      {({ field }) => (
                        <input
                          type="range"
                          min={minRate}
                          max={maxRate}
                          step={1}
                          {...field}
                          value={values.guided_rate}
                          onChange={(e) =>
                            setFieldValue(
                              "guided_rate",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full h-2 bg-tranquil-teal/30 rounded-lg appearance-none cursor-pointer accent-tranquil-teal"
                        />
                      )}
                    </Field>
                    <p className="text-sm text-gray-600 mt-1">
                      Selected Rate:{" "}
                      <span className="text-custom-green font-bold">
                        GHS {values.guided_rate || minRate}
                      </span>
                    </p>
                    <ErrorMessage
                      name="guided_rate"
                      component="div"
                      className="text-red-600 text-xs"
                    />
                  </div>

                  {/* Justification */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      why you choose this rate(optional)
                    </label>
                    <Field
                      as="textarea"
                      name="guided_rate_justification"
                      rows={3}
                      placeholder="In just one short sentence"
                      className="login-form-input"
                    />
                  </div>

                  <div className="text-center">
                    <LoaderButton
                      loading={mutation.isPending}
                      loadingText="Saving..."
                      text="Update Guided Rate"
                      type="submit"
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default GuidedRateSystem;
