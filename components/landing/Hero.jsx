import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[600px]">
        <Image 
            src="/assets/images/hero-bg6.webp" 
            layout="fill" 
            objectFit="cover" 
            alt="Hero Background"
            className="absolute inset-0"
        />

        {/* Dark overlay */}
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

        <div className="absolute inset-0 flex items-center justify-start p-4 lg:p-8 z-10">
            <div className="p-0 xl:p-2 rounded-lg w-[350px] md:w-[600px] lg:w-[700px]">
                <h1 className="text-pink-500 font-montserrat text-3xl tracking-widest">Trusted by All</h1>
                <h1 className="text-[30px] font-bold md:text-[40px] lg:text-6xl tracking-wider blue_gradient">In Home ​Healthcare ​App</h1>
                <p className="mt-4 text-base lg:text-xl w-[250px] xl:text-2xl md:w-[400px] xl:w-[610px] text-black font-extralight tracking-widest">
                    Top A.I generated matchmaking with ​highly trained caregivers, reliable ​assistance, round-the-clock services, ​and more!
                </p>
                <Link href="/">
                    <div className="flex justify-center items-center space-x-2 h-14 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg w-[180px] mt-10 transitioning shadow-2xl">
                        <button className="text-white font-bold">Try for Free</button>
                        <span><Image src="/assets/icons/arrow.svg" width={30} height={10}/></span>
                    </div>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default Hero