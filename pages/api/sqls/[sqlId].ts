import dbConnect from '../../../utils/dbConnect';
import type { NextApiRequest, NextApiResponse } from 'next';
import Sql from '../../../models/Sql';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
    
  await dbConnect();
  const { sqlId } = req.query;

  console.log(`Received ${req.method} request for SQLId: ${sqlId}`);

  if (req.method === 'PUT') {
    try {
      const { status } = req.body;
      // Update the SQL status
      const updatedSql = await Sql.findByIdAndUpdate(
        sqlId,
        { status },
        { new: true }
      );

      if (!updatedSql) {
        return res.status(404).json({ message: 'SQL not found' });
      }
      

      res.json({ success: true, data: updatedSql });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update SQL status'});
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}