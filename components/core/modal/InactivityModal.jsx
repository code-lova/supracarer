"use client";
import React from "react";
import { NormalBtn } from "../button";

const InactivityModal = ({ show, countdown, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[300px] shadow-lg text-center">
        <h2 className="text-lg font-bold text-slate-gray mb-2">
          Inactive Session
        </h2>
        <p className="text-sm mb-4">
          You’ve been inactive. You will be logged out in{" "}
          <span className="font-semibold">{countdown}s</span>.
        </p>
    
        <NormalBtn onClick={onCancel} children="Stay Logged In" />
      </div>
    </div>
  );
};

export default InactivityModal;
