// pages/api/gmailnator.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
 

  const options = {
    method: 'POST',
    url: 'https://gmailnator.p.rapidapi.com/generate-email',
    headers: {
  'x-rapidapi-key': process.env.RAPIDAPI_KEY as string,
  'x-rapidapi-host': 'gmailnator.p.rapidapi.com',
  'Content-Type': 'application/json'
},
  data: { options: [1, 2, 3] }
  };

  try {
    const response = await axios.request(options);
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
}
