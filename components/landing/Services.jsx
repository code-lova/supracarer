import React from 'react';
import { service } from '@constants/index';
import Image from 'next/image';

const Services = () => {
    return (
        <div className="my-20 ml-4 mr-4 mb-12">
            <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Our Services</h1>
            
            <div className='my-10 w-[300px] lg:w-full mx-auto grid grid-cols-1 md:grid md:grid-cols-1 lg:grid lg:grid-cols-3 gap-2'>
                {service.map((services) => (
                    <div key={services.id} className='text-center p-2 border border-gray-200'>
                        <Image 
                            src={services.image} 
                            width={290} 
                            height={60}
                            className=' object-contain mx-auto'
                            loading='lazy'
                        />
                        <div className='font-semibold'>
                            <p className='text-pink-500'>{services.title}</p>
                            <p className='font-extralight'>{services.description}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Services