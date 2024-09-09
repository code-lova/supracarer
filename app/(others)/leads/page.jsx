"use client";
import React, {useState, } from 'react';


const LeadPageComponent = () => {

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
      });
    
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
    });

    const [loading, setLoading] = useState(false)

    const validateForm = () => {
        let isValid = true;
        const newErrors = { fullName: '', email: '' };
    
        if (!formData.fullName) {
          newErrors.fullName = 'Name is required';
          isValid = false;
        }
    
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!formData.email) {
          newErrors.email = 'Email is required';
          isValid = false;
        } else if (!emailPattern.test(formData.email)) {
          newErrors.email = 'Invalid email address';
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Send form data to API
          setLoading(true)
          try {
            const response = await fetch('/api/leademail', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData),
            });
            if (response.ok) {
              alert('Form submitted successfully');
                // Clear form data
                setFormData({
                    fullName: '',
                    email: '',
                });
            } else {
              alert('Failed to send form');
            }
          } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred');
          }finally{
            setLoading(false)
          }
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    

    
  return (
    <section className="flex justify-center items-center w-full h-screen bg-gray-400">
        <div className="w-full max-w-md mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
            <div className="text-center mb-6">
                <p className="font-bold text-pink-500 font-montserrat text-3xl tracking-widest">Welcome</p>
                <p className="mt-2 text-[20px] font-bold lg:text-2xl tracking-wider blue_gradient">Join the list of early birds to get full exclusive premium features</p>
                <p className="text-sm mt-6 text-gray-900 font-semibold">Fill the form below to get full access.</p>
            </div>
    

            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="mb-4 flex flex-row space-x-5 items-center">
                    <div>
                        <label htmlFor="full-name" className="text-slate-gray font-semibold mb-1">Name:</label>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            id="fullName" 
                            name='fullName'
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="example: John Harry" 
                            className="form-control"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                    </div>
                </div>

                <div className="mb-4 flex flex-row space-x-6 items-center">
                    <div>
                        <label htmlFor="email" className="text-slate-gray font-semibold mb-1">Email:</label>
                    </div>
                    <div>
                        <input 
                            type="email" 
                            id="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address" 
                            className="form-control"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                </div>
                    

                <div className="mt-8 text-center">
                    <button type="submit" disabled={loading} className="form-button transitioning bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        {loading ? "Processing... ": "Join the Queue"}
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default LeadPageComponent;
