// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@services/internal";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const game = await getGameById(1);
  res.status(200).json(game);
}

export async function getGameById(id: number) {
  const game = await prisma.game.findFirst({
    where: { id },
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
  return game;
}
