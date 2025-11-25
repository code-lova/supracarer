"use client";
import React from "react";
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
import WordCountTextarea from "@components/core/WordCountTextarea";
import { withGRSFeature } from "@components/hoc/withFeatureFlag";

const GuidedRateSystem = () => {
  const { user, refetchUser } = useUserContext();
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
      refetchUser();
      localStorage.setItem("firstTimeLogin", "false");
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
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-xl flex items-center justify-center shadow-lg">
            <FaDoorOpen className="text-white text-xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Guided Rate System
            </h1>
            <p className="text-gray-600 text-sm">
              Configure your service rates and preferences
            </p>
          </div>
        </div>
        <div className="flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 shadow-sm">
          <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold text-sm">!</span>
          </div>
          <span className="text-yellow-800 font-medium">
            Platform fee of 20% will be deducted from your set rate
          </span>
        </div>
      </div>

      <div className="grid grid-col-1 xl:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white col-span-2 xl:col-span-1 xl:h-[669px] shadow-sm rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-tranquil-teal/10 to-custom-green/10 p-6 border-b border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUserDoctor className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Rate Overview
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                View and manage your current guided rate settings for health
                services
              </p>
            </div>
          </div>
          <div className="p-6 flex-1 h-[56vh] overflow-y-auto custom-scrollbar">
            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-custom-green rounded-full"></div>
              Current Guided Rate
            </h4>
            {isLoading ? (
              <GrsLoaderSkeleton />
            ) : grsData && grsData.grs ? (
              <div className="bg-gradient-to-br from-gray-50 to-tranquil-teal/5 rounded-xl border border-tranquil-teal/20 p-5 shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700 text-sm">
                      Rate Type
                    </span>
                    <span className="font-semibold text-tranquil-teal capitalize bg-tranquil-teal/10 px-3 py-1 rounded-lg text-sm">
                      {grsData.grs.rate_type}
                    </span>
                  </div>
                  {grsData.grs.nurse_type && (
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700 text-sm">
                        Nurse Type
                      </span>
                      <span className="font-semibold text-tranquil-teal capitalize bg-tranquil-teal/10 px-3 py-1 rounded-lg text-sm">
                        {grsData.grs.nurse_type}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700 text-sm">
                      Guided Rate
                    </span>
                    <span className="font-bold text-xl text-custom-green">
                      GHS {grsData.grs.guided_rate}
                    </span>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-red-700 text-sm">
                        Platform Fee (20%)
                      </span>
                      <span className="font-semibold text-red-600">
                        -GHS{" "}
                        {grsData.grs.guided_rate
                          ? (grsData.grs.guided_rate * 0.2).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-700 text-sm">
                        You Receive
                      </span>
                      <span className="font-bold text-lg text-green-700">
                        GHS{" "}
                        {grsData.grs.guided_rate
                          ? (grsData.grs.guided_rate * 0.8).toFixed(2)
                          : "0.00"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700 text-sm">
                      Duration
                    </span>
                    <span className="font-semibold text-tranquil-teal text-sm bg-tranquil-teal/10 px-3 py-1 rounded-lg">
                      {grsData.grs.care_duration}
                    </span>
                  </div>
                  <div className="py-2">
                    <span className="font-medium text-gray-700 text-sm block mb-2">
                      Service Types
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {grsData.grs.service_types &&
                      grsData.grs.service_types.length > 0 ? (
                        grsData.grs.service_types.map((type) => (
                          <span
                            key={type}
                            className="bg-custom-green/10 text-custom-green px-3 py-1 rounded-lg text-xs font-medium border border-custom-green/20 shadow-sm"
                          >
                            {type}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic text-sm">
                          No services selected
                        </span>
                      )}
                    </div>
                  </div>
                  {grsData.grs.guided_rate_justification && (
                    <div className="py-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <span className="font-medium text-gray-700 text-sm block mb-1">
                        Rate Justification
                      </span>
                      <span className="text-gray-600 text-sm leading-relaxed">
                        "{grsData.grs.guided_rate_justification}"
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUserDoctor className="text-gray-400 text-xl" />
                </div>
                <p className="text-gray-500 font-medium">
                  No guided rate set yet
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Configure your rate using the form
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Right Card (Form) */}
        <div className="bg-white h-[669px] shadow-sm rounded-2xl border border-gray-100 overflow-y-auto col-span-2 mb-4">
          <div className="bg-gradient-to-r from-tranquil-teal/5 to-custom-green/5 p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-tranquil-teal to-custom-green rounded-xl flex items-center justify-center shadow-lg">
                <FaDoorOpen className="text-white text-lg" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Configure Rate Settings
                </h2>
                <p className="text-gray-600 text-sm">
                  Set your service rates and preferences
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 overflow-y-auto custom-scrollbar h-full">
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
                    minRate = Math.min(
                      ...selectedOptions.map((opt) => opt.min)
                    );
                    maxRate = Math.max(
                      ...selectedOptions.map((opt) => opt.max)
                    );
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
                  <Form className="space-y-6">
                    {/* Rate Type Selector */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Choose Rate Type
                      </label>
                      <Field
                        as="select"
                        name="rate_type"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                      >
                        <option value="shift">Per Shift</option>
                        <option value="hourly">Per Hour</option>
                      </Field>
                      <ErrorMessage
                        name="rate_type"
                        component="div"
                        className="text-red-500 text-xs mt-2 font-medium"
                      />
                    </div>

                    {/* Nurse Type (for nurses only) */}
                    {isNurse && (
                      <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                          Nurse Type
                        </label>
                        <Field
                          as="select"
                          name="nurse_type"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 bg-white shadow-sm"
                        >
                          <option value="">Select Nurse Type</option>
                          <option value="RN">Registered Nurse (RN)</option>
                          <option value="NAC">Nursing Assistant (NAC)</option>
                        </Field>
                        <ErrorMessage
                          name="nurse_type"
                          component="div"
                          className="text-red-500 text-xs mt-2 font-medium"
                        />
                      </div>
                    )}

                    {/* Shift Rate Form */}
                    {isShift && (
                      <>
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-800 mb-3">
                            Shift Duration
                          </label>
                          <Field
                            as="select"
                            name="care_duration"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-tranquil-teal focus:border-transparent transition-all duration-200 bg-white shadow-sm"
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
                            className="text-red-500 text-xs mt-2 font-medium"
                          />
                        </div>

                        {/* For nurses, require nurse_type before showing service types */}
                        {isNurse ? (
                          values.nurse_type ? (
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                              <label className="block text-sm font-semibold text-gray-800 mb-3">
                                Service Types
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                {shiftServiceType.map((service) => (
                                  <div
                                    key={service}
                                    className={`px-4 py-3 rounded-xl cursor-pointer border-2 transition-all duration-200 text-sm font-medium text-center ${
                                      values.service_types.includes(service)
                                        ? "bg-custom-green text-white border-custom-green shadow-lg transform scale-105"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-custom-green hover:bg-custom-green/5"
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
                                className="text-red-500 text-xs mt-2 font-medium"
                              />
                            </div>
                          ) : null
                        ) : (
                          // For non-nurses, show service types by default
                          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                              Service Types
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {shiftServiceType.map((service) => (
                                <div
                                  key={service}
                                  className={`px-4 py-3 rounded-xl cursor-pointer border-2 transition-all duration-200 text-sm font-medium text-center ${
                                    values.service_types.includes(service)
                                      ? "bg-custom-green text-white border-custom-green shadow-lg transform scale-105"
                                      : "bg-white text-gray-700 border-gray-200 hover:border-custom-green hover:bg-custom-green/5"
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
                              className="text-red-500 text-xs mt-2 font-medium"
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
                            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                              <label className="block text-sm font-semibold text-gray-800 mb-3">
                                Hourly Service Types (Live-out)
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                {(
                                  hourRateServiceOptions[values.nurse_type] ||
                                  []
                                ).map((option) => (
                                  <div
                                    key={option.name}
                                    className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-sm font-medium text-center ${
                                      values.service_types.includes(option.name)
                                        ? "bg-custom-green text-white border-custom-green shadow-lg transform scale-105"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-custom-green hover:bg-custom-green/5"
                                    }`}
                                    onClick={() => {
                                      const current = values.service_types;
                                      const exists = current.includes(
                                        option.name
                                      );
                                      const updated = exists
                                        ? current.filter(
                                            (s) => s !== option.name
                                          )
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
                                className="text-red-500 text-xs mt-2 font-medium"
                              />
                            </div>
                          ) : null
                        ) : (
                          // For non-nurses, show all hourly service types by default
                          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                              Hourly Service Types (Live-out)
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {(hourRateServiceOptions["RN"] || [])
                                .concat(hourRateServiceOptions["NAC"] || [])
                                .map((option) => (
                                  <div
                                    key={option.name}
                                    className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 text-sm font-medium text-center ${
                                      values.service_types.includes(option.name)
                                        ? "bg-custom-green text-white border-custom-green shadow-lg transform scale-105"
                                        : "bg-white text-gray-700 border-gray-200 hover:border-custom-green hover:bg-custom-green/5"
                                    }`}
                                    onClick={() => {
                                      const current = values.service_types;
                                      const exists = current.includes(
                                        option.name
                                      );
                                      const updated = exists
                                        ? current.filter(
                                            (s) => s !== option.name
                                          )
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
                              className="text-red-500 text-xs mt-2 font-medium"
                            />
                          </div>
                        )}

                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                          <label className="block text-sm font-semibold text-gray-800 mb-3">
                            Duration (2 hours default)
                          </label>
                          <Field
                            type="text"
                            disabled
                            name="care_duration"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm bg-gray-100 text-gray-600 cursor-not-allowed"
                          />
                        </div>
                      </>
                    )}

                    {/* Rate Slider */}
                    <div className="bg-gradient-to-br from-tranquil-teal/5 to-custom-green/5 rounded-xl p-5 border border-tranquil-teal/20">
                      <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-gray-800">
                          Set Your Rate
                        </label>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-custom-green">
                            GHS {values.guided_rate || minRate}
                          </div>
                          <div className="text-xs text-gray-500">
                            Range: GHS {minRate} - GHS {maxRate}
                          </div>
                        </div>
                      </div>
                      <Field name="guided_rate">
                        {({ field }) => (
                          <div className="relative">
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
                              className="w-full h-3 bg-gradient-to-r from-tranquil-teal/20 to-custom-green/20 rounded-lg appearance-none cursor-pointer slider"
                              style={{
                                background: `linear-gradient(to right, #088272 0%, #088272 ${
                                  ((values.guided_rate - minRate) /
                                    (maxRate - minRate)) *
                                  100
                                }%, #e5e7eb ${
                                  ((values.guided_rate - minRate) /
                                    (maxRate - minRate)) *
                                  100
                                }%, #e5e7eb 100%)`,
                              }}
                            />
                          </div>
                        )}
                      </Field>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>GHS {minRate}</span>
                        <span>GHS {maxRate}</span>
                      </div>
                      <ErrorMessage
                        name="guided_rate"
                        component="div"
                        className="text-red-500 text-xs mt-2 font-medium"
                      />
                    </div>

                    {/* Justification */}
                    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                      <WordCountTextarea
                        name="guided_rate_justification"
                        label="Rate Justification (Optional)"
                        value={values.guided_rate_justification}
                        onChange={(text) =>
                          setFieldValue("guided_rate_justification", text)
                        }
                        maxWords={50}
                        rows={4}
                        placeholder="Briefly explain why you choose this rate..."
                      />
                    </div>

                    <div className="pt-4">
                      <LoaderButton
                        loading={mutation.isPending}
                        loadingText="Saving Rate..."
                        text="Update Guided Rate"
                        type="submit"
                        className="w-full bg-gradient-to-r from-tranquil-teal to-custom-green hover:from-tranquil-teal/90 hover:to-custom-green/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withGRSFeature(GuidedRateSystem);
