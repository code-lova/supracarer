"use client";
import React, { useState } from "react";
import StepWrapper from "./bookingUi-kit/StepWrapper";
import StepOne from "./bookingUi-kit/StepOne";
import StepTwo from "./bookingUi-kit/StepTwo";
import StepThree from "./bookingUi-kit/StepThree";
import StepFour from "./bookingUi-kit/StepFour";
import BookingSummary from "./bookingUi-kit/BookingSummary";
import { bookAppointment } from "@service/request/client/bookingApt";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useUserContext } from "@context/userContext";


const Booking = () => {
  const { user } = useUserContext();
  const userDetails = user?.data;
  const [step, setStep] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [formValues, setFormValues] = useState({
    care_duration: "",
    care_duration_value: "",
    care_type: "",
    accommodation: "No",
    meal: "No",
    num_of_meals: "",
    medical_services: [],
    other_extra_service: [],
    special_notes: "",
    start_date: "",
    end_date: "",
    start_time: "",
    start_time_period: "AM",
    end_time: "",
    end_time_period: "AM",
    requesting_for: "",
    someone_name: "",
    someone_email: "",
    someone_phone: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormValues((prev) => {
        const updated = checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value);
        return {
          ...prev,
          [name]: updated,
        };
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const goToNextStep = () => setStep((prev) => prev + 1);
  const goToPrevStep = () => setStep((prev) => prev - 1);
  const goToPreview = () => setIsPreviewing(true);
  const backToForm = () => setIsPreviewing(false);

  const mutate = useMutation({
    mutationFn: bookAppointment,
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      // Clear form values and return to step one
      setFormValues({
        care_duration: "",
        care_duration_value: "",
        care_type: "",
        accommodation: "No",
        meal: "No",
        num_of_meals: "",
        medical_services: [],
        other_extra_services: [],
        special_notes: "",
        start_date: "",
        end_date: "",
        start_time: "",
        start_time_period: "AM",
        end_time: "",
        end_time_period: "AM",
        requesting_for: "",
        someone_name: "",
        someone_email: "",
        someone_phone: "",
      });
      setStep(0);
      setIsPreviewing(false);
    },
    onError: (error) => {
      toast.error(error.message || "Error booking appointment");
    },
  });

  const handleSubmit = () => {
    console.log("Submitting form data:", formValues);
    mutate.mutate(formValues);
  };

  return (
    <div className="pageContent">
      <div className="xl:h-[690px] bg-gray-50 rounded-2xl shadow-lg px-5 py-3">
        {/* rest o the form here  */}
        {!isPreviewing ? (
          <StepWrapper
            steps={["Basic Info", "Care Details", "Schedule", "Requester Info"]}
            currentStep={step}
          >
            {step === 0 && (
              <StepOne
                values={formValues}
                goToNextStep={goToNextStep}
                setFormValues={setFormValues}
                userDetails={userDetails}
              />
            )}
            {step === 1 && (
              <StepTwo
                values={formValues}
                handleChange={handleChange}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
                setFormValues={setFormValues}
              />
            )}
            {step === 2 && (
              <StepThree
                values={formValues}
                handleChange={handleChange}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
              />
            )}
            {step === 3 && (
              <StepFour
                values={formValues}
                handleChange={handleChange}
                setFormValues={setFormValues}
                goToPrevStep={goToPrevStep}
                goToPreview={goToPreview}
              />
            )}
          </StepWrapper>
        ) : (
          <BookingSummary
            formValues={formValues}
            onBack={backToForm}
            onSubmit={handleSubmit}
            isLoading={mutate.isPending}
          />
        )}
      </div>
    </div>
  );
};
export default Booking;
