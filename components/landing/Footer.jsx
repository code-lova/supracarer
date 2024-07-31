import React from 'react';
import Image from 'next/image';
import { companySocials } from '@constants/index';
import Link from 'next/link';


const Footer = () => {
  return (
    <footer className='w-full bg-footer bg-cover p-6'>
        <div className='font-extralight text-slate-gray grid grid-cols-1 gap-6 md:px-8 lg:grid lg:grid-cols-3'>
            <div>
                <Image 
                    src="/assets/images/logo.png" 
                    width={180} 
                    height={150} 
                    alt="Supracarer logo"
                    className="object-fill w-[200px]"
                /> 
                <p className='mt-4'>
                    AI generated matchmaking with ​highly trained caregivers, reliable ​assistance, round-the-clock services, ​and more!
                </p>
                <div className='flex space-x-2 mt-4'>
                    {companySocials.map((socials) => (
                        <div key={socials.id} className='rounded-md bg-custom-green p-1'>
                            <a href={socials.link}>
                                <Image src={socials.icon} width={15} height={30} alt={socials.name}/>
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            <div className='mt-2'>
                <h1 className='font-bold text-custom-green underline text-lg'>Useful Links</h1>
               <div className='flex justify-between'>
                    <div>
                        <ul className='mt-2 p-3'>
                            <li className='hover:underline xl:transitioning'>
                                <a href="">FaQ</a>
                            </li>
                            <li className='hover:underline xl:transitioning'>
                                <a href="">About</a>
                            </li>
                            <li className='hover:underline xl:transitioning'>
                                <a href="">Terms & Conditions</a>
                            </li>
                            <li className='hover:underline xl:transitioning'>
                                <a href="">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul className='mt-2 p-3'>
                                <li className='hover:underline xl:transitioning'>
                                    <a href="">Services</a>
                                </li>
                                <li className='hover:underline xl:transitioning'>
                                    <a href="">Features</a>
                                </li>
                                <li className='hover:underline xl:transitioning'>
                                    <a href="">Download App</a>
                                </li>
                                <li className='hover:underline xl:transitioning'>
                                    <a href="">Support</a>
                                </li>
                            </ul>
                    </div>
               </div>
            </div>

            <div className='mb-16'>
                <h1 className='font-bold text-custom-green underline text-lg'>Contacts</h1>

                <div className='flex space-x-2 mt-4'>
                    <p className='font-bold'>Address:</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, officiis</p>
                </div>
                <div className='flex space-x-2 mt-4'>
                    <p className='font-bold'>Email:</p>
                    <p>mebcghana@gmail.com</p>
                </div>
                <div className='flex space-x-2 mt-4'>
                    <p className='font-bold'>Phone:</p>
                    <p>(+233)-54-914-8087</p>
                </div>
            </div>

        </div>
        <div className="absolute inset-x-0 bottom-0 w-full bg-gray-500 text-center py-4">
            <p className="text-white">© 2024 Supracarer. All rights reserved.</p>
        </div>
    </footer>
  )
}

export default Footer