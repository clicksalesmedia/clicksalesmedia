import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import { Lead } from '../../../models/Lead';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers to allow all origins for development. Be sure to make this more restrictive for production use.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  await dbConnect();

  const { leadId } = req.query;

  // Log the request method and leadId for monitoring and debugging
  console.log(`Received ${req.method} request for leadId: ${leadId}`);

  if (!mongoose.Types.ObjectId.isValid(leadId as string)) {
    return res.status(400).json({ message: 'Invalid leadId format' });
  }

  const { method } = req;

  switch (method) {
    case 'PUT':
      try {
        const updatedLead = await Lead.findByIdAndUpdate(
          leadId, // Direct usage of `leadtId` as Mongoose handles conversion internally
          { $set: req.body },
          { new: true, runValidators: true }
        );

        if (!updatedLead) {
          return res.status(404).json({ message: 'Lead not found' });
        }

        // Log the successful update operation
        console.log(`Successfully updated lead with ID: ${leadId}`);

        res.json({ success: true, data: updatedLead });
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Update Error:', error.message);
          res.status(500).json({ message: 'Failed to update the Lead', error: error.message });
        } else {
          console.error('Unexpected error type:', error);
          res.status(500).json({ message: 'An unexpected error occurred' });
        }
      }
      break;
    default:
      res.setHeader('Allow', ['PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
