import { NextApiRequest, NextApiResponse } from "next";
import { getCurrentUser } from "@/lib/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}