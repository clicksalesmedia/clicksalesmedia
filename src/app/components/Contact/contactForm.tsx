'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

// Define a type for the form state
interface FormData {
  name: string;
  company: string;
  website: string;
  mobile: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    website: '',
    mobile: '',
    email: '',
    message: '',
  });

  // Adjusted to use ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Adjusted to use FormEvent<HTMLFormElement>
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Contact submitted successfully');
        setFormData({
          name: '',
          company: '',
          website: '',
          mobile: '',
          email: '',
          message: '',
        }); // Reset form data
      } else {
        alert('Failed to submit contact. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit contact:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (

      <form className="space-y-4" onSubmit={handleSubmit} > 
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Name" className='text-whiteColor'/>
        </div>
        <TextInput type="text" sizing="md" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Company" className='text-whiteColor'/>
        </div>
        <TextInput type="text" sizing="md" id="company" name="company" value={formData.company} onChange={handleChange} placeholder="Your Company Name" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Website" className='text-whiteColor'/>
        </div>
        <TextInput  sizing="md" type="text" id="website" name="website" value={formData.website} onChange={handleChange} placeholder="www.yourwebsite.com" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Mobile" className='text-whiteColor'/>
        </div>
        <TextInput id="mobile" type="text" sizing="md" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Your Mobile Number" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>


        <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" className='text-whiteColor'/>
        </div>
        <TextInput id="email" type="email"  name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com"  required shadow style={{ background: '#222222',color:'#FFFFFF', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

    <div>
      <div className="mb-2 block">
        <Label htmlFor="comment" value="Your message" className='text-whiteColor'/>
      </div>
      <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Message..." className='p-2 bg-[#222222] rounded-xs border-secondaryColor' required rows={4} />
    </div>

    <Button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-xs text-white bg-secondaryColor hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send your Message
        </Button>
  
      </form>

  );
};

export default ContactForm;
