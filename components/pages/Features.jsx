import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import { features, keyBenefits } from '@constants';
import Link from 'next/link';
import Footer from './Footer';

const Features = () => {
  return (
    <section>
        <Navbar />
        <div className='w-full py-20 md:py-28'>
            <div className='relative w-screen h-[318px]'>
                <Image 
                    src="/assets/images/featuresBg.png"
                    fill
                    alt="about us"
                    className="object-cover w-full h-full"
                />
                <div className='absolute inset-0 flex flex-col items-center justify-center max-w-[300px] mx-auto lg:max-w-full'>
                    <h1 className=' text-white text-3xl md:text-4xl font-bold text-center'>
                        Discover Our Key Features
                    </h1>
                    <div className=' mt-4'>
                        <p className='text-white text-base font-medium py-2 text-center'>Your holistic health journey, empowered by technology</p>
                    </div>
                </div>
                
            </div>
        </div>
        
        <div className='py-10 px-6 lg:px-[70px]'>
            <div className='text-center mb-16'>
                <h1 className='text-4xl font-bold blue_gradient font-montserrat tracking-widest'>Features</h1>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] lg:gap-10'>
                <div className='mb-10'>
                    <h1 className='text-[28px] blue_gradient'>Discover a holistic health experience designed to support your well-being</h1>
                  
                    <h3 className=' justify-center leading-loose mt-4 text-base'>
                        Supracarer empowers your wellness journey by offering tailored health plans, 
                        convenient appointment scheduling, and comprehensive mental wellness support. 
                        The platform creates personalized strategies to meet your unique health goals while 
                        providing continuous assistance for building healthier habits. Users can easily book 
                        sessions with a diverse range of certified practitioners, all within a user-friendly app. 
                       
                    </h3>
                    <p className='mt-10 text-center font-bold'>Supracarer makes it simple to prioritize your holistic health with expert guidance and easy-to-use tools.</p>
                </div>
                <div className="grid grid-cols-1 gap-y-9 md:grid md:grid-cols-2 md:gap-x-2 lg:grid lg:grid-cols-2 lg:gap-x-2">
                    {features.map((feature) => (
                        <div key={feature.name} className="border border-gray-400 rounded-lg p-6 transitioning shadow-lg">
                            <Image 
                                src={feature.icon} 
                                width={70} height={20}
                                className=" object-contain mx-auto"
                            />
                            <h3 className="font-bold blue_gradient uppercase mt-4 leading-6 text-base tracking-wider text-center">{feature.title}</h3>
                            <p className="font-semi-thick text-semi-dark mt-4 leading-6 text-base tracking-wider text-center">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className='py-16 px-6 lg:px-[70px] bg-gradient-to-r from-transparent to-gray-200'>
            <h1 className='text-4xl font-bold text-center blue_gradient font-montserrat tracking-widest'>Why Choose Supracarer</h1>

            <div className='grid grid-cols-1 md:grid md:gap-1 md:grid-cols-2 mt-12'>
                <div className='mb-8'>
                    <Image src="/assets/images/features.png" width={500} height={310} className='object-fit mx-auto'/>
                    <Link href="/login">
                        <div className="flex justify-center mx-auto items-center space-x-2 h-14 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 rounded-lg w-[198px] mt-16 transitioning shadow-2xl">
                            <button className="text-white font-bold">Get started for free</button>
                        </div>
                    </Link>
                </div>

                <div className='bg-white p-4 md:p-8 rounded-md'>
                    {keyBenefits.map((item) => (
                        <div key={item.id} className='mb-4'>
                            <div className="">
                                <h1 className='text-[16px] font-bold text-pink-500'>{item.title}</h1>
                                <ul className='list-none ml-2'>
                                    <li className='custom-dot text-base md:text-sm tracking-wider leading-loose my-2'>
                                        {item.desc.paragraph1}
                                    </li>
                                    {item.desc.paragraph2 && (
                                        <li className='custom-dot text-base md:text-sm leading-loose tracking-wider my-2 border-b border-dotted'>
                                            {item.desc.paragraph2}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>

        <Footer />
    </section>
  )
}

export default Features
