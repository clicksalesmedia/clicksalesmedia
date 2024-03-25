import React, { useState, FunctionComponent, ChangeEvent, FormEvent } from 'react';
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react';
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";

interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormService = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="px-4 grid place-content-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-secondaryColor to-[#b58e5e] text-white font-medium px-4 py-2 rounded-xs hover:opacity-90 transition-opacity"
      >
        Start Boosting your business today
      </button>
      <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

const SpringModal: FunctionComponent<SpringModalProps> = ({ isOpen, setIsOpen }) => {
  // Form state initialization
  const [form, setForm] = useState({
    name: '',
    company: '',
    website: '',
    mobile: '',
    services: 'Web Solutions', // Default service or could be empty string ''
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert('Lead submitted successfully');
        setIsOpen(false); // Close modal on success
        // Reset form state
        setForm({
          name: '',
          company: '',
          website: '',
          mobile: '',
          services: 'Web Solutions',
          email: '',
        });
      } else {
        alert('Failed to submit lead. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit lead', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-primaryColor/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#222222] to-primaryColor text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Name" className='text-whiteColor'/>
        </div>
        <TextInput type="text" sizing="md" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Your Full Name" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="Your email" className='text-whiteColor'/>
        </div>
        <TextInput id="email" type="email"  name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required shadow style={{ background: '#222222',color:'#FFFFFF', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Company" className='text-whiteColor'/>
        </div>
        <TextInput type="text" sizing="md" id="company" name="company" value={form.company} onChange={handleChange} placeholder="Your Company Name" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Website" className='text-whiteColor'/>
        </div>
        <TextInput type="text" sizing="md" id="website" name="website" value={form.website} onChange={handleChange} placeholder="www.yourwebsite.com" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="base" value="Mobile" className='text-whiteColor'/>
        </div>
        <TextInput id="mobile" type="text" sizing="md" name="mobile" value={form.mobile} onChange={handleChange} placeholder="Your Mobile Number" style={{ background: '#222222',color:'#111827', borderColor: '#C3A177', borderRadius:1}}/>
      </div>

      <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Select your country" />
      </div>
      <Select id="services" name="services" value={form.services} onChange={handleChange}>
                    <option value="Web Solutions">Web Solutions</option>
                    <option value="Google Marketing">Google Marketing</option>
                    <option value="Social Media Management">Social Media Management</option>
                    <option value="Email Marketing">Email Marketing</option>
      </Select>
    </div>

          <Button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-xs text-white bg-secondaryColor hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send your Message
          </Button>
  
      </form>

              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormService;

