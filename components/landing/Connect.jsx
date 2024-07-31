import React from 'react';
import Image from 'next/image';

const Connect = () => {
    return (
        <div className="ml-4 mr-4 mb-28">
            <div className='grid grid-col-1 gap-4 md:grid-cols-2'>
                <div>
                    <Image 
                        src="/assets/images/heart.webp"
                        width={300}
                        height={100}
                        className='object-contain mx-auto'
                        quality={70}
                    />
                </div>

                <div className='text-slate-gray font-extralight text-3xl xl:mr-8'>
                    <div className='flex justify-center'>
                        <p className='text-center xl:text-4xl font-bold text-pink-500'>
                            Connect with ​families, care for ​your loved ones, ​and make ​everyone happy
                        </p>
                    </div>
                    <div className='flex justify-center mt-10 md:mt-2 xl:mt-12'>
                        <a href="/">
                            <div className='flex item-center space-x-2 bg-gradient-to-r from-pink-500 to-blue-500 transitioning py-3 px-5 rounded-3xl text-white'>
                                <button className='font-bold'>
                                    Download Now
                                </button>
                                <Image src="/assets/icons/download.svg" width={50} height={50} />
                            </div>
                            
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Connect