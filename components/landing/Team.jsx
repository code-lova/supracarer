"use client";
import React, {useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { team } from '@constants/index';

const Team = () => {

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({
          left: -300,
          behavior: 'smooth'
        });
      };
    
    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    };


    return (
        <div className="ml-4 mb-12 bg-gradient-to-r from-transparent to-gray-200 py-20 relative">
            <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Meet The Team</h1>
            <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
                <p className="text-slate-gray">
                    Our team is a dedicated group of healthcare professionals, technologists, and innovators passionate about improving home health care.
                </p>
            </div> 

            <div className="relative">
                <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md shadow-lg focus:outline-none z-10"
                >
                    &lt;
                </button>
                <div
                    className="flex overflow-x-scroll scrollbar-hide space-x-4 py-4"
                    ref={scrollContainerRef}
                >
                    {team.map((member) => (
                        <div
                            key={member.id}
                            className="flex-shrink-0 border border-gray-400 bg-gradient-to-r from-gray-200 to-green-100 rounded-lg p-2 transitioning shadow-lg text-center"
                        >
                            <Image className="object-fill mx-auto" src={member.image} objectFit="cover" width={250} height={220} />
                            <div className="py-4">
                                <h1 className="text-slate-gray font-light">{member.name}</h1>
                                <p className="text-sm font-semibold">{member.position}</p>
                            </div>
                            <div className="flex justify-center space-x-4 mt-4 bg-slate-500 p-4 rounded-xl">
                                <Link href={member.socials.facebook.link}>
                                    <Image src={member.socials.facebook.icon} width={20} height={20} />
                                </Link>
                                <Link href={member.socials.instagram.link}>
                                    <Image src={member.socials.instagram.icon} width={20} height={20} />
                                </Link>
                                <Link href={member.socials.linkedin.link}>
                                    <Image src={member.socials.linkedin.icon} width={20} height={20} />
                                </Link>
                                <Link href={member.socials.twitter.link}>
                                    <Image src={member.socials.twitter.icon} width={20} height={20} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md shadow-lg focus:outline-none"
                >
                &gt;
                </button>
            </div>
        </div>
    )
}

export default Team