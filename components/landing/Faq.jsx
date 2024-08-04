"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { faqData } from '@constants/index';

const Faq = () => {

  const [openFaq, setOpenFaq] = useState(faqData[0].id) // Set the first accordion item open by default

    const toggleAccodion = (id) => {
        setOpenFaq(id === openFaq ? null : id) // Close the item if it's already open, else open it
    }

  return (
    <div className="ml-4 mb-12 bg-gradient-to-r from-transparent to-gray-200 py-20">
      <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Frequently Asked Questions</h1>
      <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
        <p className="text-lg leading-7 text-semi-dark">
            Get Answers to Your Questions About Supracarer, Our AI-Powered In Home Health Care App
        </p>
      </div> 

      <div className='grid grid-cols-1 gap-10 sm:mx-auto lg:gap-1 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 p-2 mt-10'>
        <div>
          <Image src="/assets/images/faq-img.webp" width={500} height={310} className=' object-contain ' loading='lazy'/>
        </div>

        <div className='mr-4'>
          {faqData.map((faq) => (
            <div key={faq.id} className='mb-4'>
            
              <div 
                className={`faq-heading-bg ${openFaq === faq.id ? 'bg-custom-green text-white' : 'bg-white text-black'}`}
                onClick={() => toggleAccodion(faq.id)}
              >
                  <h1 className='text-[16px]'>{faq.question}</h1>
                  <Image 
                      src="/assets/icons/arrow-down.svg" 
                      width={15} 
                      height={20}
                      className={`transition-transform ${openFaq === faq.id ? 'transform rotate-180': ''}`}
                  />
              </div>

              <div className={`bg-white font-semi-thick p-4 transition-max-height duration-500 ease-in-out overflow-hidden ${openFaq === faq.id ? 'max-h-96' : 'hidden'}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default Faq