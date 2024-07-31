import React from 'react';
import Image from 'next/image';
import { howItWorks } from '@constants/index';

const HowitWorks = () => {
  return (
    <div className="my-20 ml-4 mr-4 mb-12">
        <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">How It Works</h1>
        
        <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 space-x-4 mt-2 lg:mt-6">
            <div className="p-2">
                <Image 
                    className="object-fill w-full h-auto rounded-xl" 
                    src="/assets/images/app_ui.webp" 
                    width={600} 
                    height={640}
                    layout='responsive'
                />
            </div>
            <div className="p-0">
                {howItWorks.map((how) => (
                    <div key={how.id} className="my-2">
                        <b>{how.id}</b>
                        <h1>
                            <b className="text-pink-500">{how.name}</b> <p className="font-extralight text-slate-gray">{how.description}</p>
                        </h1>
                        
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HowitWorks