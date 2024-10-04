import React from 'react'

const ContactUs = () => {
  return (
    <div className="ml-4 mr-4 mb-12 bg-contact py-20">
        <h1 className="text-3xl font-bold text-center blue_gradient font-montserrat tracking-widest">Stay Connected With Us</h1>
        <div className="text-center my-4 font-extralight px-4 text-base leading-6 lg:px-40">
            <p className="text-lg leading-7 text-semi-dark">
                Reach out to Supracarer for personalized assistance and support with our AI-powered home healthcare services
            </p>
        </div> 

        <div className="p-2 py-6">
            <form action="" className="flex flex-col">
                <div className="grid sm:grid-cols-1 md:grid-cols-1 gap-8 mx-auto lg:grid-cols-1 xl:grid-cols-2">
                    <div className="flex flex-col">
                        <label htmlFor="full-name" className="text-slate-gray font-semibold mb-1">Full Name</label>
                        <input type="text" id="full-name" placeholder="e.g., John Doe" className="form-control" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-slate-gray font-semibold mb-1">Email Address</label>
                        <input type="email" id="email" placeholder="e.g., johndoe@gmail.com" className="form-control" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="subject" className="text-slate-gray font-semibold mb-1">Subject</label>
                        <input type="text" id="subject" placeholder="I need help urgently" className="form-control" />
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
  )
}

export default ContactUs