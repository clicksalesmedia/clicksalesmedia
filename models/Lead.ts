// models/Lead.ts
import mongoose, { Document } from 'mongoose';

interface ILead extends Document {
  name: string;
  company: string;
  website: string;
  mobile: string;
  services: 'Website Solutions' | 'Performance Marketing' | 'Google Marketing' | 'Search engine optimization' | 'Social Media Management' | 'Email Marketing' | 'Conversion rate optimization' | 'Branding' | 'Ecommerce Solutions' | 'Ads Management';
  email: string;
  status: string;
}

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  website: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  services: { type: String, required: true, enum: ['Website Solutions','Performance Marketing', 'Google Marketing','Search engine optimization', 'Social Media Management', 'Email Marketing', 'Conversion rate optimization', 'Branding', 'Ecommerce Solutions', 'Ads Management'], trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`,
    },
  },
  status: { type: String, default: 'No Answered', enum: ['Answered', 'No Answered'] },
}, { timestamps: true });

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', leadSchema);

export { Lead };
export type { ILead };

