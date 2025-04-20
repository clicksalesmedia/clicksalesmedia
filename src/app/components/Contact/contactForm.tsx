'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useTranslation } from '@/app/hooks/useTranslation';

// Define a type for the form state that matches the Contact model
interface FormData {
  name: string;
  company: string;
  website: string;
  phone: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    website: '',
    phone: '',
    email: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({
    success: null,
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
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });
    
    try {
      // Format the data to match what the API expects
      const contactData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone, // Changed from mobile to phone to match API
        company: formData.company,
        message: formData.message,
        // Include website in the message since the API doesn't have a website field
        ...(formData.website ? { 
          message: `${formData.message}\n\nWebsite: ${formData.website}` 
        } : {})
      };
      
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: t('contact.form.success'),
        });
        
        // Reset form data
        setFormData({
          name: '',
          company: '',
          website: '',
          phone: '',
          email: '',
          message: '',
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || t('contact.form.error'));
      }
    } catch (error) {
      console.error('Failed to submit contact:', error);
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : t('contact.form.error'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {submitStatus.success === true && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {submitStatus.message}
        </div>
      )}
      
      {submitStatus.success === false && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitStatus.message}
        </div>
      )}
    
      <form className="space-y-4" onSubmit={handleSubmit}> 
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value={t('contact.form.name')} className='text-whiteColor'/>
          </div>
          <TextInput 
            type="text" 
            sizing="md" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder={t('contact.form.namePlaceholder')} 
            required
            style={{ background: '#222222', color:'#C3A177', borderColor: '#C3A177', borderRadius:1}}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="company" value={t('contact.form.company')} className='text-whiteColor'/>
          </div>
          <TextInput 
            type="text" 
            sizing="md" 
            id="company" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            placeholder={t('contact.form.companyPlaceholder')} 
            style={{ background: '#222222', color:'#C3A177', borderColor: '#C3A177', borderRadius:1}}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="website" value={t('contact.form.website')} className='text-whiteColor'/>
          </div>
          <TextInput  
            sizing="md" 
            type="text" 
            id="website" 
            name="website" 
            value={formData.website} 
            onChange={handleChange} 
            placeholder={t('contact.form.websitePlaceholder')} 
            style={{ background: '#222222', color:'#C3A177', borderColor: '#C3A177', borderRadius:1}}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone" value={t('contact.form.phone')} className='text-whiteColor'/>
          </div>
          <TextInput 
            id="phone" 
            type="text" 
            sizing="md" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder={t('contact.form.phonePlaceholder')} 
            style={{ background: '#222222', color:'#C3A177', borderColor: '#C3A177', borderRadius:1}}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value={t('contact.form.email')} className='text-whiteColor'/>
          </div>
          <TextInput 
            id="email" 
            type="email"  
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder={t('contact.form.emailPlaceholder')}  
            required 
            shadow 
            style={{ background: '#222222', color:'#C3A177', borderColor: '#C3A177', borderRadius:1}}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="message" value={t('contact.form.message')} className='text-whiteColor'/>
          </div>
          <Textarea 
            id="message" 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            placeholder={t('contact.form.messagePlaceholder')} 
            className='focus:text-[#C3A177] p-2 bg-[#222222] rounded-xs border-secondaryColor' 
            required 
            rows={4} 
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-xs text-white bg-secondaryColor hover:bg-secondaryColor/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondaryColor disabled:opacity-70"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
