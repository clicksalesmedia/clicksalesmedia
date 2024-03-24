// pages/api/leads/index.js
import dbConnect from '../../../utils/dbConnect'; // Ensure you have a utility function to handle db connections
import { Lead } from '../../../models/Lead';

// Adjusted to immediately invoke and await the dbConnect function.
export default async (req, res) => {
    // Set CORS headers to allow all origins for development. Be sure to make this more restrictive for production use.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Using the correct model name according to the import
        const leads = await Lead.find({});
        res.status(200).json({ success: true, data: leads });
      } catch (error) {
        // Log error to the console for server-side debugging
        console.error('GET Error:', error);
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      console.log('POST request body:', req.body); // Log incoming POST data
      try {
        const lead = await Lead.create(req.body);
        res.status(201).json({ success: true, data: lead });
      } catch (error) {
        console.error('POST Error:', error); // Log error to the console
        // Returning a more descriptive error message in the response
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
};
