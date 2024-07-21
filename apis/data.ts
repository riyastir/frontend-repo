import { NextApiRequest, NextApiResponse } from "next"

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (
    req.headers.authorization !== `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
  ) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  res.status(200).json({ message: "Data fetched successfully" })
}
