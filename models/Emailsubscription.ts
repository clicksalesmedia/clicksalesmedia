// models/Emailsubscription.ts
import mongoose, { Document } from 'mongoose';

interface IEmailSubscription extends Document {
  email: string;
}

const emailSubscriptionSchema = new mongoose.Schema({
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
}, { timestamps: true });

const EmailSubscription = mongoose.models.EmailSubscription || mongoose.model<IEmailSubscription>('EmailSubscription', emailSubscriptionSchema);

export { EmailSubscription };
export type { IEmailSubscription };
