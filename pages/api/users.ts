// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
  import { PrismaClient } from '@prisma/client'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany();
  res.status(200).json(users)
}