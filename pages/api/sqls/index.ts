import dbConnect from '../../../utils/dbConnect'; 
import type { NextApiRequest, NextApiResponse } from 'next';
import  Sql  from '../../../models/Sql'; 

// Handler for the /api/sqls endpoint
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


  await dbConnect();

  if (req.method === 'GET') {
    try {
      const sqls = await Sql.find({})
      .populate({
        path: 'contactRef', // Populate the Mql
        populate: { 
          path: 'contactRef', // Then populate the Lead from within the Mql
          model: 'Lead' // Ensure this matches the model name you've used for Leads
        }
      })
      res.status(200).json({ success: true, data: sqls });
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


