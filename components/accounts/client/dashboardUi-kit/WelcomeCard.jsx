import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegCalendarAlt } from "react-icons/fa";

const WelcomeCard = ({ userDetails }) => {
  return (
    <>
      <div className="bg-carer-blue rounded-2xl p-6 shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.02] h-auto md:h-[240px]">
        <div className="flex flex-col md:flex-row item-center justify-between gap-4 h-full">
          {/* Text Section */}
          <div className="flex-1">
            {userDetails && (
              <h3 className="text-white font-semibold text-sm md:text-sm">
                Hello, {userDetails.fullname || "UserName"}
              </h3>
            )}
            <div className="w-[300px] text-white font-bold text-sm lg:text-3xl mt-3">
              <p>Check Your Health Regularly</p>
            </div>

            <Link href="/client/booking" passHref>
              <button className="mt-4 flex items-center gap-2 bg-white text-carer-blue font-semibold py-2 px-5 rounded-xl hover:bg-carer-blue hover:text-white transition duration-300 ease-in-out">
                <span>Book Appointment</span>
                <FaRegCalendarAlt size={18} className="text-inherit" />
              </button>
            </Link>
          </div>

          {/* Image Section */}
          <div className="flex-1 max-w-[180px] md:max-w-[235px] w-full mt-10 lg:mt-4 mx-auto">
            <Image
              src="/assets/images/heart.png"
              width={400}
              height={240}
              alt="well-being"
              className="w-full h-auto object-contain -mt-8"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeCard;
