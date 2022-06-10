// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const prisma = new PrismaClient();
  const games = await prisma.game.findMany({
    include: {
      progresses: {
        select: {
          progress: true,
          player: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(games);
}
