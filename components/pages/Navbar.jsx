"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@constants';
import Link from 'next/link';


const Navbar = () => {

    const [toggle, setToggle] = useState(false);


  return (
    <div>
        <div className="hidden md:flex bg-gray-800 w-full fixed z-50 padding text-white item-center justify-between">
            <div>
                <Image 
                    src="/assets/images/logo.png" 
                    width={180} 
                    height={50} 
                    alt="Supracarer logo"
                    className="mx-auto"
                />
            </div>
            <div className='flex gap-5 items-center justify-center mt-2 md:mt-0'>
                <div className='flex item-center space-x-1'>
                    <Image 
                        src="/assets/icons/envelope.svg" 
                        width={20} 
                        height={25} 
                        alt="email"
                        className=" object-contain"
                    />
                    <p className='text-xs md:text-sm'>supracarer@gmail.com</p>
                </div>
                <div className='flex item-center space-x-1'>
                    <Image 
                        src="/assets/icons/phone.svg" 
                        width={20} 
                        height={25} 
                        alt="mobile"
                        className="object-contain"
                    />
                    <p className='text-xs md:text-sm'>+233-234-567-890</p>
                </div>
            </div>
        </div>
        <nav className="bg-white fixed shadow-md z-50 md:top-20 w-full padding">
            <div className='flex items-center justify-between'>
                <ul className={`${toggle ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
                    } lg:flex flex-col px-6 lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-5 bg-gray-50 lg:bg-transparent absolute lg:static top-[78px] lg:top-0 left-0 w-full lg:w-auto p-5 lg:p-0 transition-all duration-500 ease-in-out delay-200 lg:transition-none lg:opacity-100 lg:translate-y-0`}
                >
                    {navLinks.map((nav) => (
                        <li key={nav.id} 
                            className="text-gray-700 py-2 hover:lg:text-custom-green lg:transitioning lg:py-2 font-bold text-[16px]"
                            
                        >
                            <Link href={nav.link}>{nav.title}</Link>
                        </li>
                    ))}
                </ul>
                {/* show this menu handburger button for smaller screens */}
                <Image 
                    className="cursor-pointer lg:hidden z-20" 
                    src={toggle ? '/assets/icons/closeb.svg' : '/assets/icons/menub.svg'} 
                    width={40} 
                    height={50} 
                    alt="menu"
                    onClick={() => setToggle(!toggle)}
                />          
                <Link href="/signin">
                    <div className="flex justify-center -mt-2 items-center space-x-2 h-14 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg w-[168px] transitioning shadow-md">
                        <button className="text-white font-bold">Request A Nurse</button>
                    </div>
                </Link>
            </div>

        </nav>
    </div>
  )
}

export default Navbar
