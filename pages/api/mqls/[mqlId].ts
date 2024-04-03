import dbConnect from '../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import Mql from '../../../models/Mql';
import  Sql  from '../../../models/Sql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
    
  await dbConnect();
  const { mqlId } = req.query;

  console.log(`Received ${req.method} request for MQLId: ${mqlId}`);

  if (req.method === 'GET') {
    try {
      // Ensure to find a single MQL by its ID and populate its contactRef
      const mql = await Mql.findById(mqlId).populate('contactRef');
      if (!mql) {
        return res.status(404).json({ success: false, message: 'MQL not found' });
      }
      res.status(200).json({ success: true, data: mql });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }
  
 else if (req.method === 'PUT') {
    try {
      const { status } = req.body;
      const updatedMql = await Mql.findByIdAndUpdate(
        mqlId,
        { status },
        { new: true }
      );

      if (!updatedMql) {
        return res.status(404).json({ message: 'MQL not found' });
      }

      if (status === 'Showed') {
        const sqlExists = await Sql.findOne({ contactRef: mqlId });
        if (!sqlExists) {
            try {
                await Sql.create({ contactRef: mqlId });
            } catch (error) {
                console.error(`Error creating SQL entry for MQLId: ${mqlId}`, error);
            }
        } else {
          console.error('No new entry created');
        }
    } else if (status === 'No Showed') {
        try {
            const deleteResponse = await Sql.findOneAndDelete({ contactRef: mqlId });
            if (deleteResponse) {
                console.log(`SQL entry deleted successfully for MQLId: ${mqlId}`);
            } else {
                console.log(`No SQL entry found to delete for MQLId: ${mqlId}`);
            }
        } catch (error) {
            console.error(`Error deleting SQL entry for MQLId: ${mqlId}`, error);
        }
    }
    
    

      res.json({ success: true, data: updatedMql });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update MQL status'});
    }
  } else {
    res.setHeader('Allow', ['GET','PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}