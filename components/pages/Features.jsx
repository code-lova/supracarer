import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';


const Features = () => {
  return (
    <section>
        <Navbar />
        <div className='w-full py-20'>
            <div className='relative w-screen h-[318px]'>
                <Image 
                    src="/assets/images/aboutbg.png"
                    fill
                    alt="about us"
                    className="object-cover w-full h-full"
                />
                <h1 className='absolute inset-0 flex items-center justify-center text-white text-4xl font-bold'>
                    About Us - Supracarer
                </h1>
            </div>
        </div>
        <div className='py-10 px-6 lg:px-[120px]'>
            <p>hello</p>
        </div>
    </section>
  )
}

export default Features
