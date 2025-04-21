import React, { useState, FunctionComponent, ChangeEvent, FormEvent } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { AnimatePresence, motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { FiAlertCircle } from 'react-icons/fi';

interface FormServiceProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string;
}

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
  }
}

const FormService: FunctionComponent<FormServiceProps> = ({ isOpen, setIsOpen, buttonText }) => {
  const [form, setForm] = useState({
    name: '',
    company: '',
    website: '',
    mobile: '',
    package: 'Premium',
    email: '',
  });

  const metaApiToken = 'EAAIeh85nYDIBOZBPtvD57hw6a6kX053khHM6G5XXMJZC5SBpuwWlSeCzDaCZBb62Y2ac9ZAnZCQeTo76zz38Gn7eMGgze2RR4cyrZA6kkk7tX9llAZCkLNRydySNLBveXOm3ZCrnLJB6dDrRGBOJ96hHe2O6mMOg9v0jBnuv7CgvPiEUE9tdWsoz2kZA8IxsTZBn5qvwZDZD';

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send form data to your API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leadwebanimations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        // Send data to Meta Ads
        await fetch(`https://graph.facebook.com/v12.0/1552827585519840/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: [{
              event_name: 'FormSubmission',
              event_time: Math.floor(new Date().getTime() / 1000),
              user_data: {
                email: form.email,
                phone: form.mobile,
                first_name: form.name.split(' ')[0],
                last_name: form.name.split(' ').slice(1).join(' '),
              },
              custom_data: {
                company: form.company,
                website: form.website,
                package: form.package,
              },
            }],
            access_token: metaApiToken,
          }),
        });

        Swal.fire({
          icon: 'success',
          title: 'Thank you for completing the form.',
          text: 'Please wait while our customer service team reaches out to you as soon as possible.',
          background: '#272727',
          confirmButtonColor: '#C3A177',
          confirmButtonText: 'Okay',
        });
        setIsOpen(false);
        setForm({
          name: '',
          company: '',
          website: '',
          mobile: '',
          package: 'Premium',
          email: '',
        });

        // Push form data to dataLayer for GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'formSubmission',
          formData: {
            name: form.name,
            company: form.company,
            website: form.website,
            mobile: form.mobile,
            package: form.package,
            email: form.email,
          },
        });

        // Track events in Facebook
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
          window.fbq('track', 'Contact');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'Failed to submit lead. Please try again.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'Retry',
        });
      }
    } catch (error) {
      console.error('Failed to submit lead', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred. Please try again.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Retry',
      });
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
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#222222] to-primaryColor text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-primaryColor grid place-items-center mx-auto">
                <FiAlertCircle />
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Name" className="text-whiteColor" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email2" value="Your email" className="text-whiteColor" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    required
                    shadow
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Company" className="text-whiteColor" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Your Company Name"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Website" className="text-whiteColor" />
                  </div>
                  <TextInput
                    type="text"
                    sizing="md"
                    id="website"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="www.yourwebsite.com"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="base" value="Mobile" className="text-whiteColor" />
                  </div>
                  <TextInput
                    id="mobile"
                    type="text"
                    sizing="md"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="Your Mobile Number"
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Package" value="Select Package" className="text-left text-white" />
                  </div>
                  <Select
                    id="package"
                    name="package"
                    value={form.package}
                    onChange={handleChange}
                    style={{ background: '#222222', color: '#C3A177', borderColor: '#C3A177', borderRadius: 1 }}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-md text-sm font-medium rounded-xs text-white bg-secondaryColor hover:bg-[#b89469] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b89469]"
                >
                  {buttonText}
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
