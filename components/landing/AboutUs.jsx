import React from 'react';
import Image from 'next/image';
import { aboutUs,mission, vision } from '@constants/index';


const AboutUs = () => {
    return (
        <div className="my-20 ml-4 mr-4 mb-12">
            <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Who We Are</h1>
            <div className="text-center my-2 font-extralight px-4 text-base leading-6 lg:px-40">
                <p className="text-slate-gray">We are a pioneering healthcare technology company dedicated to revolutionizing home health care through our AI-powered app. </p>
            </div>
            
            
            <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 gap-2 mt-2 lg:mt-6">
                <div className="px-4 lg:px-2 font-extralight">

                    <p className="my-6 lg:my-0 capitalize font-bold text-2xl tracking-widest underline text-pink-500">Supracarer</p>
                    {aboutUs.map((abt) => (
                        <p className="my-4 " key={abt.id}>
                            {abt.statement} <br />
                        </p>
                    ))}

                    {mission.map((mision) => (
                        <div key={mision.title} className="my-4">
                            <h1 className="font-semibold text-pink-500 text-xl underline">{mision.title}</h1>
                            <p className="leading-7">{mision.mission}</p>
                        </div>
                    ))}

                    {vision.map((vison) => (
                        <div key={vison.title} className="my-4">
                            <h1 className="font-semibold text-pink-500 text-xl underline">{vison.title}</h1>
                            <p className="leading-7">{vison.vision}</p>
                        </div>
                    ))}
                </div>
                <div className='mt-8 xl:mt-0'>
                    <Image 
                        className="object-fill" 
                        src="/assets/images/crutches.webp" 
                        width={480} 
                        height={350}
                        alt='nurse-helping-elderly'
                    />
                </div>
            </div>
        </div>
    )
}

export default AboutUs