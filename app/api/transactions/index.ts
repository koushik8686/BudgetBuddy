
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Supabase client setup. We use the service role key for server-side operations
// with disabled Row Level Security (RLS) on inserts.
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// The default handler for this API route.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the incoming request is a POST method.
  if (req.method === 'POST') {
    try {
      // Destructure the required fields from the request body.
      const {
        userId,
        type,
        amount,
        category,
        description,
        bank,
        account,
        recipient,
        extractionConfidence,
        rawMessage,
      } = req.body;

      // Validate that essential fields are present.
      if (!userId || !type || !amount) {
        return res.status(400).json({ message: 'Missing required transaction details' });
      }

      // Insert the new transaction data into Supabase.
      const { data, error } = await supabase
        .from('transactions')
        .insert([
          {
            user_id: userId,
            type,
            amount,
            category,
            description,
            bank,
            account,
            recipient,
            extraction_confidence: extractionConfidence,
            raw_message: rawMessage,
          },
        ])
        .select()
        .single(); // Use .single() to return a single object instead of an array.

      // If an error occurred during the insert, throw it to be caught below.
      if (error) throw error;

      // Respond with a success message and the saved transaction data.
      res.status(201).json({
        message: 'Transaction saved successfully',
        transaction: data,
      });
    } catch (error: any) {
      // Log the error and send a 500 status code with a descriptive message.
      console.error('Error saving transaction:', error);
      res.status(500).json({ message: 'Error saving transaction', error: error.message });
    }
  } else {
    // If the request method is not POST, send a 405 Method Not Allowed response.
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}