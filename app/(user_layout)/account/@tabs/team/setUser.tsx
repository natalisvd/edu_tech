import type { NextApiRequest, NextApiResponse } from "next";
import { setUser } from "./action";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await setUser(); // Adjust this based on how setUser works
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to set user" });
  }
}
