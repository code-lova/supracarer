import React from "react";
import { Send } from "@components/core/icon/send";

const Subscription = () => {
  return (
    <div className="w-full py-4 bg-gradient-to-r from-transparent to-gray-100 mt-16">
      <h1 className="text-3xl font-bold text-center text-carer-blue tracking-wide">
        Subscribe & stay updated
      </h1>
      <div className="text-center my-1 px-8 text-base leading-6">
        <p className="text-lg leading-7 text-semi-dark">
          Sign up to our newsletter and be the first
        </p>
        <p className="text-lg leading-7 text-semi-dark">
          to know about latest news, special offers, events, and discounts.
        </p>
      </div>

      <div className="grid grid-cols-1 mt-4">
        <div className="flex justify-center">
          <form action="" className="subscribe-form flex flex-row space-x-4">
            <input
              type="email"
              className="w-[320px] xl:w-[800px] outline-none bg-gray-200"
              placeholder="Enter Your Email Address"
            />
            <button>
              <Send color="#006838" />
            </button>
          </form>
        </div>
        <div className="mt-2 text-center">
          <p className="font-extrabold text-lg text-ever-green">
            (+233)-54-914-8087
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
