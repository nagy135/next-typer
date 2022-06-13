// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '@services/internal';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const progresses = await prisma.progress.findMany();
  res.status(200).json(progresses)
}
