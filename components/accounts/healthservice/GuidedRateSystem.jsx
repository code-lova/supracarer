import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const GuidedRateSystem = () => {
  const handleSubmit = () => {};

  return (
    <div className="pageContainer">
      <div className="w-full bg-custom-white shadow-lg rounded-2xl p-6 h-[669px] ">
        <div className="w-[300px] h-[500px] flex flex-col justify-center item-center border">
          {/* <Formik initialValues={{}} onSubmit={handleSubmit}>
            {() => (
              <Form>
                <div>
                  <label className="block text-sm font-medium">
                    Shift Type
                  </label>
                  <Field
                    as="select"
                    name="shift_type"
                    className="login-form-input"
                  >
                    {Object.keys(shiftRateBands).map((key) => (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    ))}
                  </Field>
                </div>

                <div>
                  <label className="block text-sm font-medium">
                    Service Type
                  </label>
                  <Field
                    as="select"
                    name="service_type"
                    className="login-form-input"
                  >
                    {Object.keys(
                      serviceRateBands[
                        userDetails?.practitioner === "nurse" ? "NAC" : "RN"
                      ]
                    ).map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Rate Type
                  </label>
                  <Field
                    as="select"
                    name="rate_type"
                    className="login-form-input"
                  >
                    <option value="shift">Per Shift</option>
                    <option value="daily">Per Day</option>
                  </Field>
                  <ErrorMessage
                    name="rate_type"
                    component="div"
                    className="text-red-600 text-xs"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Set Your Rate (Max: GHS 300)
                  </label>
                  <Field name="guided_rate">
                    {({ field, form }) => {
                      const practitionerType =
                        userDetails?.practitioner === "nurse" ? "NAC" : "RN";
                      const shift = form.values.shift_type;
                      const service = form.values.service_type;

                      const [min, max] = serviceRateBands[practitionerType]?.[
                        service
                      ] || [5, 100];

                      return (
                        <div>
                          <input
                            type="range"
                            min={min}
                            max={max}
                            step={1}
                            {...field}
                            value={form.values.guided_rate}
                            onChange={(e) =>
                              form.setFieldValue(
                                "guided_rate",
                                parseInt(e.target.value)
                              )
                            }
                            className="w-full h-2 bg-tranquil-teal/30 rounded-lg appearance-none cursor-pointer accent-tranquil-teal"
                          />
                          <div className="mt-1 text-sm text-gray-600">
                            Selected Rate:{" "}
                            <span className="text-custom-green font-bold">
                              GHS {form.values.guided_rate}
                            </span>{" "}
                            for <strong>{shift}</strong> ({service}) a{" "}
                            {form.values.rate_type === "daily"
                              ? "Day"
                              : "Shift"}
                          </div>
                        </div>
                      );
                    }}
                  </Field>
                  <ErrorMessage
                    name="guided_rate"
                    component="div"
                    className="text-xs text-red-600"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium">
                    Justification for Rate (optional)
                  </label>
                  <Field
                    as="textarea"
                    name="rate_justification"
                    className="login-form-input"
                    rows={3}
                  />
                </div>
              </Form>
            )}
          </Formik> */}
        </div>
      </div>
    </div>
  );
};

export default GuidedRateSystem;
