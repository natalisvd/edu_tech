
import { setUser } from '@/app/(user_layout)/account/@tabs/team/action';
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await setUser();  // Adjust this based on how setUser works
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set user' });
  }
}
