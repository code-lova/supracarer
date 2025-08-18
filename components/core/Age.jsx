import React from "react";

const Age = ({ dateOfBirth, fallback = "N/A" }) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return null;

    const today = new Date();
    const birth = new Date(birthDate);

    // Check if the birth date is valid
    if (isNaN(birth.getTime())) return null;

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    // If the birthday hasn't occurred this year, subtract 1
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age : null;
  };

  const age = calculateAge(dateOfBirth);

  return <span>{age !== null ? age : fallback}</span>;
};

export default Age;
