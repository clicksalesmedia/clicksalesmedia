import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../utils/dbConnect'; // Utility function to handle db connections
import { Contact } from '../../../models/Contact'; // Ensure this import matches the updated model

type Data = {
  success: boolean;
  data?: any; 
  error?: string;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse<Data> // Use the 'Data' type for the response
) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust this to be more restrictive
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');


  await dbConnect(); // Ensuring database connection is established

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        // Using the correct model name according to the import
        const contacts = await Contact.find({});
        res.status(200).json({ success: true, data: contacts });
      } catch (error: unknown) {
        if (error instanceof Error) {
        console.error('GET Error:', error);
        res.status(400).json({ success: false, error: error.message });
      }}
      break;

    case 'POST':
      // Debug log for incoming POST data
      console.log('POST request body:', req.body);
      try {
        // Using the correct model name according to the import for creation
        const contact = await Contact.create(req.body);
        res.status(201).json({ success: true, data: contact });
      } catch (error: unknown) {
        if (error instanceof Error) {
        // Log error to the console for server-side debugging
        console.error('POST Error:', error);
        // Providing a user-friendly error message if creation fails
        res.status(400).json({ success: false, error: error.message });
      } 
    }
      break;


    default:
      // Informing the client about allowed methods if an unsupported method is used
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ success: false, error: `Method ${method} not allowed` });
      break;
  }
}
