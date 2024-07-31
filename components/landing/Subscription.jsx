import React from 'react';
import Image from 'next/image'

const Subscription = () => {
    return (
        <div className="ml-2 mb-12 py-20">
            <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Subscribe & stay updated</h1>
            <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
                <p className="text-slate-gray">
                Sign up to our newsletter and be the first to know about latest news, special offers, events, and discounts.
                </p>
            </div> 

            <div className='grid grid-cols-1 mt-8'>
                <div className='flex justify-center'>
                    <form action="" className='subscribe-form flex flex-row space-x-4'>
                        <input type="email" className='w-[320px] xl:w-[800px] outline-none bg-gray-200' placeholder='Enter Your Email Address' />
                        <button>
                            <Image src="/assets/icons/send.svg" width={50} height={50} />
                        </button>
                    </form>
                </div>
                <div className='mt-8 text-center'>
                    <p className='font-extrabold text-2xl text-custom-green'>(+233)-54-914-8087</p>
                </div>
            </div>
        </div>
    )
}

export default Subscription