"use client";
import React,{ useState } from 'react';
import { pricingPlan } from '@constants/index';

const Pricing = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : pricingPlan.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < pricingPlan.length - 1 ? prevIndex + 1 : 0));
    };

    const handleIndicatorClick = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="my-20 ml-4 mr-4 mb-12 relative">
            <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Our Pricing Plan</h1>
            <div className="text-center my-2 font-extralight px-4 text-base leading-6 lg:px-40">
                <p className="text-slate-gray">Affordable and Flexible Pricing Plans to Meet Your Home Health Care Needs.</p>
            </div>

            {/* Pricing plan section for larger screen */}
            <div className="hidden my-10 w-[350px] lg:w-full mx-auto md:grid md:grid-cols-1 lg:grid lg:grid-cols-3 gap-2 ">
                {pricingPlan.map((plan) => (
                    <div key={plan.id} className='text-center p-2 border-2 border-gray-400 rounded-lg shadow-3xl'>
                        <div className='mt-2 py-2'>
                            <h1 className='text-2xl font-bold text-pink-500'>{plan.name}</h1>
                            <h2 className='font-extralight text-lg my-2'>{plan.heading}</h2>
                            <p className='text-6xl font-palanquin'>${plan.amount}</p>
                            <div className='flex justify-evenly font-palanquin mt-2'>
                                <p>${plan.amount}/Month</p>
                                <p>${plan.annual}/Year {plan.discount} Off</p>
                            </div>

                            <div className='mt-8 ml-6 lg:ml-0 xl:ml-8'>
                                {Object.keys(plan.features).map((key) => (
                                    <div key={key} className='flex space-x-2 lg:flex-none lg:space-x-1 lg:text-sm xl:text-[15px] font-extralight mt-6'>
                                        <p>{plan.features[key].available === 'yes' ? '✅' : '❌'}</p>
                                        <p>{plan.features[key].title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='mt-6 cursor-pointer mb-8'>
                            <button className='form-button'>Contact Now</button>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Show slider pricing section for smaller screen */}
            <div className="sm:block md:hidden lg:hidden relative">
                <div className="relative w-full overflow-hidden">
                    <div className="flex transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        {pricingPlan.map((plan) => (
                            <div key={plan.id} className="w-full flex-shrink-0 text-center p-2 border-2 border-gray-400 rounded-lg shadow-3xl">
                                <div className='mt-2 py-2'>
                                    <h1 className='text-2xl font-bold text-pink-500'>{plan.name}</h1>
                                    <h2 className='font-extralight text-lg my-2'>{plan.heading}</h2>
                                    <p className='text-6xl font-palanquin'>${plan.amount}</p>
                                    <div className='flex justify-evenly font-palanquin mt-2'>
                                        <p>${plan.amount}/Month</p>
                                        <p>${plan.annual}/Year {plan.discount} Off</p>
                                    </div>

                                    <div className='mt-8 sm:ml-10 ml-6 lg:ml-0 xl:ml-8'>
                                        {Object.keys(plan.features).map((key) => (
                                            <div key={key} className='flex space-x-2 lg:flex-none lg:space-x-1 lg:text-sm xl:text-[15px] font-extralight mt-6'>
                                                <p>{plan.features[key].available === 'yes' ? '✅' : '❌'}</p>
                                                <p>{plan.features[key].title}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='mt-6 cursor-pointer mb-6'>
                                    <button className='form-button'>Contact Now</button>
                                </div>
                            </div>
                            
                        ))}
                    </div>
                </div>

                <div className="flex justify-center mt-4">
                    <button onClick={handlePrevious} className="mx-2 px-6 py-2 bg-gray-300 rounded-md">{"<"}</button>
                        {pricingPlan.map((_, index) => (
                            <button key={index} onClick={() => handleIndicatorClick(index)} className={`mx-1 w-3 h-3 rounded-full ${currentIndex === index ? 'bg-pink-500' : 'bg-gray-400'}`}></button>
                        ))}
                    <button onClick={handleNext} className="mx-2 px-6 py-2 bg-gray-300 rounded-md">{">"}</button>
                </div>
            </div>
        </div>
    )
}

export default Pricing