'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiBriefcase, FiPhone, FiMessageSquare } from 'react-icons/fi';
import { Label, TextInput, Select, Textarea } from 'flowbite-react';

export interface BookingFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message?: string;
  service: string;
}

interface ChatBookingFormProps {
  onSubmit: (formData: BookingFormData) => void;
  isSubmitting: boolean;
}

const ChatBookingForm: React.FC<ChatBookingFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: 'General Consultation',
  });

  const [errors, setErrors] = useState<Partial<BookingFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when field is being edited
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (formData.phone && !/^[+0-9\s()-]{7,20}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <div className="mb-1 block">
            <Label htmlFor="name" value="Name" className="text-whiteColor flex items-center text-xs">
              <FiUser className="mr-1" /> Full Name
            </Label>
          </div>
          <TextInput
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={{ 
              background: '#1a1a1a',
              color: '#fff',
              borderColor: errors.name ? '#f56565' : '#C3A177',
              borderRadius: 4
            }}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
          )}
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="email" value="Email" className="text-whiteColor flex items-center text-xs">
              <FiMail className="mr-1" /> Email Address
            </Label>
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
            style={{ 
              background: '#1a1a1a',
              color: '#fff',
              borderColor: errors.email ? '#f56565' : '#C3A177',
              borderRadius: 4
            }}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="mb-1 block">
              <Label htmlFor="phone" value="Phone" className="text-whiteColor flex items-center text-xs">
                <FiPhone className="mr-1" /> Phone Number
              </Label>
            </div>
            <TextInput
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone"
              style={{ 
                background: '#1a1a1a',
                color: '#fff',
                borderColor: errors.phone ? '#f56565' : '#C3A177',
                borderRadius: 4
              }}
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
          <div>
            <div className="mb-1 block">
              <Label htmlFor="service" value="Service" className="text-whiteColor flex items-center text-xs">
                Service Needed
              </Label>
            </div>
            <Select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              style={{
                background: '#1a1a1a',
                color: '#fff',
                borderColor: '#C3A177',
                borderRadius: 4
              }}
            >
              <option value="General Consultation">General Consultation</option>
              <option value="Website Development">Website Development</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="SEO & Content Marketing">SEO & Content Marketing</option>
              <option value="PPC & Google Ads">PPC & Google Ads</option>
              <option value="Branding & Design">Branding & Design</option>
            </Select>
          </div>
        </div>

        <div>
          <div className="mb-1 block">
            <Label htmlFor="message" value="Message" className="text-whiteColor flex items-center text-xs">
              <FiMessageSquare className="mr-1" /> Your Message
            </Label>
          </div>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project..."
            rows={2}
            style={{
              background: '#1a1a1a',
              color: '#fff',
              borderColor: '#C3A177',
              borderRadius: 4
            }}
          />
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white text-sm font-medium bg-primaryColor hover:bg-primaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor transition-colors 
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 animate-spin inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full"></span>
                Processing...
              </>
            ) : (
              'Request Pricing'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatBookingForm; 