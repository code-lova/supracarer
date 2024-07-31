"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { navLinks } from "@constants/index";
import { companySocials } from "@constants/index";

const Nav = () => {
    const [active, setActive] = useState('');
    const [toggle, setToggle] = useState(false);

    return (
        <nav className="bg-gray-800 fixed shadow-2xl z-50 top-0 left-0 w-full px-2 lg:px-6 lg:py-6 lg:w-[300px] lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:bg-gray-800 lg:text-white">
            <div className="flex justify-between items-center mt-3 lg:flex-col lg:items-start lg:pt-4">
                <Link 
                    href="/"
                    onClick={() => {
                        setActive('');
                        window.scrollTo(0, 0);
                    }}>
                    <Image 
                        src="/assets/images/logo.png" 
                        width={180} 
                        height={50} 
                        alt="Supracarer logo"
                        className="mx-auto"
                    />
                </Link>
                <Image 
                    className="cursor-pointer lg:hidden" 
                    src={toggle ? '/assets/images/close.svg' : '/assets/images/menu.svg'} 
                    width={40} 
                    height={50} 
                    alt="menu"
                    onClick={() => setToggle(!toggle)}
                />
            </div>
            
            <ul className={`${toggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} bg-mobile-nav`}>
                {navLinks.map((nav) => (
                    <li key={nav.id} 
                        className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[16px]"
                        onClick={() => setActive(nav.title)}
                    >
                    <Link href={nav.link}>{nav.title}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/" className="hidden lg:block">
                <div className="flex items-center space-x-2 w-[200px] download-btn transitioning shadow-shadow-1">
                    <p>Downlaod the app</p>
                    <Image src="/assets/images/download-btn.svg" width={30} height={30}/>
                </div>
            </Link>
            <div className="hidden lg:flex mt-[200px] space-x-4">
                {companySocials.map((socials) => (
                    <div key={socials.id} className='flex items-center rounded-md p-2'>
                        <a href={socials.link}>
                            <Image src={socials.icon} width={20} height={30} alt={socials.name}/>
                        </a>
                    </div>
                ))}
            </div>

           
        </nav>
    );
};

export default Nav;
