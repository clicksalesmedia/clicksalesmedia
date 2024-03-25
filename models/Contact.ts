import mongoose, { Document } from 'mongoose';

interface IContact extends Document {
  name: string;
  company: string;
  website: string;
  mobile: string;
  email: string;
  message: string;
  status: string;
}

const emailValidator = (email: string): boolean => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/; // Simplified for broader acceptance
  return regex.test(email.toLowerCase());
};

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  website: { type: String, required: false, trim: true }, 
  mobile: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [emailValidator, '{VALUE} is not a valid email address!'],
  },
  status: { type: String, default: 'No Answered', enum: ['Answered', 'No Answered'] },
}, { timestamps: true });

const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);

export { Contact };
export type { IContact };
