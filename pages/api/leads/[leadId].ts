import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect';
import { Lead } from '../../../models/Lead';
import  Mql  from '../../../models/Mql';
import  Sql  from '../../../models/Sql';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers to allow all origins for development. Be sure to make this more restrictive for production use.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  await dbConnect();

  // Extracting leadId from the query parameters
  const { leadId } = req.query;

  console.log(`Received ${req.method} request for leadId: ${leadId}`);

  // Validate the format of the leadId
  if (!mongoose.Types.ObjectId.isValid(leadId as string)) {
    return res.status(400).json({ message: 'Invalid leadId format' });
  }

  if (req.method === 'GET') {
    try {
      const lead = await Lead.findById(leadId);
      if (!lead) {
        return res.status(404).json({ message: 'Lead not found' });
      }
      res.status(200).json(lead);
    } catch (error) {
      console.error('Error fetching lead:', error);
      res.status(500).json({ message: 'Failed to fetch the lead', error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  }
  else if (req.method === 'PUT') {
    try {
      // Extract status from request body
      const { status } = req.body;

      // Validate status is provided
      if (!status) {
        return res.status(400).json({ message: "Missing required field 'status'" });
      }

      // Update lead with the new status
      const updatedLead = await Lead.findByIdAndUpdate(
        leadId,
        { $set: { status } },
        { new: true, runValidators: true }
      );

      if (!updatedLead) {
        return res.status(404).json({ message: 'Lead not found' });
      }

      if (status === 'Answered') {
        const mqlExists = await Mql.findOne({ contactRef: leadId });
        if (!mqlExists) {
            await Mql.create({ contactRef: leadId });
        }
        // No need to add SQL logic here; it will be handled in [mqlId].ts
    } else {
        // For any status other than 'Answered', remove from MQL and SQL
        await Mql.findOneAndDelete({ contactRef: leadId });
        await Sql.findOneAndDelete({ contactRef: leadId });
    }

      console.log("leadId for MQL operation:", leadId);
      
      console.log(`Successfully updated lead with ID: ${leadId}`);
      res.json({ success: true, data: updatedLead });
    } catch (error) {
      console.error('Update Error:', error);
      res.status(500).json({ message: 'Failed to update the lead', error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  } else {
    res.setHeader('Allow', ['GET','PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
