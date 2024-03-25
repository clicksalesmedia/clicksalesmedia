import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect'; 
import { Lead } from '../../../models/Lead';

type Data = {
  success: boolean;
  data?: any; 
  error?: string;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<Data> 
) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {

        const leads = await Lead.find({});
        res.status(200).json({ success: true, data: leads });
      } catch (error: unknown) {
        if (error instanceof Error) {
        console.error('GET Error:', error);
        res.status(400).json({ success: false, error: error.message });
      }}
      break;

    case 'POST':
      console.log('POST request body:', req.body); 
      try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, data: lead });
      } catch (error: unknown) {
        if (error instanceof Error) {
        console.error('POST Error:', error); 
        res.status(400).json({ success: false, error: error.message });
      }}
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
};
