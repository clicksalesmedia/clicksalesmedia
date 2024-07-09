// models/Leadwebanimation.ts
import mongoose, { Document } from 'mongoose';

interface ILeadwebanimation extends Document {
  name: string;
  company: string;
  website: string;
  mobile: string;
  package: 'Basic' | 'Standard' |'Premium';
  email: string;
  status: string;
}

const leadwebanimationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  website: { type: String, required: true, trim: true },
  mobile: { type: String, required: true, trim: true },
  package: { type: String, required: true, enum: ['Basic','Standard','Premium'], trim: true },
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

const Leadwebanimation = mongoose.models.Leadwebanimation || mongoose.model<ILeadwebanimation>('Leadwebanimation', leadwebanimationSchema);

export { Leadwebanimation };
export type { ILeadwebanimation };

