import dbConnect from '../../../utils/dbConnect'; 
import type { NextApiRequest, NextApiResponse } from 'next';
import  Mql  from '../../../models/Mql'; 

// Handler for the /api/mqls endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


  await dbConnect();

  if (req.method === 'GET') {
    try {
      const mqls = await Mql.find({}).populate('contactRef');
      res.status(200).json({ success: true, data: mqls });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    // Handle other methods or return 405 for not allowed methods
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


