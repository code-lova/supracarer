import React from 'react'
import Image from 'next/image';
import { features } from '@constants/index';

const Features = () => {
  return (
    <div className="my-10 ml-4 mr-4">
        <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Features</h1>
    
        <div className="grid grid-cols-1 gap-y-9 md:grid md:grid-cols-3 md:gap-x-4 lg:grid lg:grid-cols-3 lg:gap-x-4 my-6">
            {features.map((feature) => (
                <div key={feature.name} className="border border-gray-400 rounded-lg p-6 transitioning shadow-lg">
                    <Image 
                        src={feature.icon} 
                        width={70} height={20}
                        className=" object-contain mx-auto"
                    />
                    <p className="font-semi-thick text-semi-dark mt-4 leading-6 text-base tracking-wider text-center">{feature.description}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Features