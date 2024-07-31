"use client";
import { useRef, useState } from 'react';
import Nav from "./Nav";
import Image from "next/image";
import Link from "next/link";
import { 
        team,
        service, 
        pricingPlan,
        faqData,
    } from "@constants/index";
import Footer from './Footer';
import Hero from './Hero';
import Features from './Features';
import HowitWorks from './HowitWorks';
import AboutUs from './AboutUs';
import Services from './Services';


const Landing = () => {

    const scrollContainerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openFaq, setOpenFaq] = useState(faqData[0].id) // Set the first accordion item open by default

    const toggleAccodion = (id) => {
        setOpenFaq(id === openFaq ? null : id) // Close the item if it's already open, else open it
    }


    const scrollLeft = () => {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    };
  
    const scrollRight = () => {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    };



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
        <section className="flex flex-col lg:flex-row w-full mt-[90px] lg:mt-0">
            <Nav />
            <div className="w-full lg:ml-[300px] relative">

                {/* Hero background image */}
                <Hero />

                {/* Features of the app section */}
                <Features />

                {/* How it works */}
                <HowitWorks />

                {/* Who we are */}
               <AboutUs />

                {/* Our services section */}
                <Services />

                

                {/* The team sections */}
                <div className="ml-4 mb-12 bg-gradient-to-r from-transparent to-gray-200 py-20 relative">
                    <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Meet The Team</h1>
                    <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
                        <p className="text-slate-gray">
                            Our team is a dedicated group of healthcare professionals, technologists, and innovators passionate about improving home health care.
                        </p>
                    </div> 

                    <div className="relative">
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md shadow-lg focus:outline-none z-10"
                        >
                            &lt;
                        </button>
                        <div
                            className="flex overflow-x-scroll scrollbar-hide space-x-4 py-4"
                            ref={scrollContainerRef}
                        >
                            {team.map((member) => (
                                <div
                                    key={member.id}
                                    className="flex-shrink-0 border border-gray-400 bg-gradient-to-r from-gray-200 to-green-100 rounded-lg p-2 transitioning shadow-lg text-center"
                                >
                                    <Image className="object-fill mx-auto" src={member.image} objectFit="cover" width={250} height={220} />
                                    <div className="py-4">
                                        <h1 className="text-slate-gray font-light">{member.name}</h1>
                                        <p className="text-sm font-semibold">{member.position}</p>
                                    </div>
                                    <div className="flex justify-center space-x-4 mt-4 bg-slate-500 p-4 rounded-xl">
                                        <Link href={member.socials.facebook.link}>
                                            <Image src={member.socials.facebook.icon} width={20} height={20} />
                                        </Link>
                                        <Link href={member.socials.instagram.link}>
                                            <Image src={member.socials.instagram.icon} width={20} height={20} />
                                        </Link>
                                        <Link href={member.socials.linkedin.link}>
                                            <Image src={member.socials.linkedin.icon} width={20} height={20} />
                                        </Link>
                                        <Link href={member.socials.twitter.link}>
                                            <Image src={member.socials.twitter.icon} width={20} height={20} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={scrollRight}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-md shadow-lg focus:outline-none"
                        >
                        &gt;
                        </button>
                    </div>
                </div>


                {/* Our Pricing Plan section */}
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


                {/* FaQ section */}
                <div className="ml-4 mb-12 bg-gradient-to-r from-transparent to-gray-200 py-20">
                    <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Frequently Asked Questions</h1>
                    <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
                        <p className="text-slate-gray">
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
                                        <h1 className='text-sm'>{faq.question}</h1>
                                        <Image 
                                            src="/assets/icons/arrow-down.svg" 
                                            width={15} 
                                            height={20}
                                            className={`transition-transform ${openFaq === faq.id ? 'transform rotate-180': ''}`}
                                        />
                                    </div>

                                    <div className={`bg-white font-extralight p-4 transition-max-height duration-500 ease-in-out overflow-hidden ${openFaq === faq.id ? 'max-h-96' : 'hidden'}`}>
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* contact us section */}
                <div className="ml-4 mb-12 bg-contact py-20">
                    <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Stay Connected With Us</h1>
                    <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
                        <p className="text-slate-gray">
                            Reach out to Supracarer for personalized assistance and support with our AI-powered home healthcare services
                        </p>
                    </div> 

                    <div className="p-2">
                        <form action="" className="flex flex-col">
                            <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-8 mx-auto lg:grid-cols-1 xl:grid-cols-2">
                                <div className="flex flex-col">
                                    <label htmlFor="full-name" className="text-slate-gray font-semibold mb-1">Full Name</label>
                                    <input type="text" id="full-name" placeholder="e.g., John" className="form-control" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-slate-gray font-semibold mb-1">Email Address</label>
                                    <input type="email" id="email" placeholder="Email Address" className="form-control" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="subject" className="text-slate-gray font-semibold mb-1">Subject</label>
                                    <input type="text" id="subject" placeholder="Subject" className="form-control" />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="text-slate-gray font-semibold mb-1">Phone</label>
                                    <input type="tel" id="phone" placeholder="+00(376)-124-465" className="form-control" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 mx-auto mt-8">
                                <label htmlFor="message" className="text-slate-gray font-semibold mb-1">Message</label>
                                <textarea id="message" placeholder="Your message here..." className="textarea-control h-32"></textarea>
                            </div>
                            <div className="mt-8 text-center">
                                <button type="submit" className="form-button transitioning">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* The Subscription section */}
                <div className="ml-4 mb-12 py-20">
                    <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Subscribe & stay updated</h1>
                    <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
                        <p className="text-slate-gray">
                        Sign up to our newsletter and be the first to know about latest news, special offers, events, and discounts.
                        </p>
                    </div> 

                    <div className='grid grid-cols-1 mt-8'>
                        <div className='flex justify-center'>
                            <form action="" className='subscribe-form flex flex-row space-x-4'>
                                <input type="email" className='w-[380px] xl:w-[800px] outline-none bg-gray-200' placeholder='Enter Your Email Address' />
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

                {/* connect section */}
                <div className="ml-4 mr-4 mb-28">
                    <div className='grid grid-col-1 gap-4 md:grid-cols-2'>
                        <div>
                            <Image 
                                src="/assets/images/heart.webp"
                                width={300}
                                height={100}
                                className='object-contain mx-auto'
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

                {/* Footer section of the landing */}
                <Footer />

            </div>
           
        </section>
    );
};

export default Landing;
