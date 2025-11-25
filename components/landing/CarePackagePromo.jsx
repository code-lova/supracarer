"use client";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

const CarePackagePromo = () => (
  <div className="w-full flex justify-center my-8">
    <Link href="/pricing" passHref>
      <button className="inline-flex items-center gap-2 bg-tranquil-teal text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:bg-custom-green/90 transition-all duration-200 transform hover:scale-105">
        <FaHeart className="text-lg" />
        <span>See Our Care Packages</span>
      </button>
    </Link>
  </div>
);

export default CarePackagePromo;
