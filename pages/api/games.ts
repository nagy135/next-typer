// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@services/internal";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const games = await getGames();
  res.status(200).json(games);
}

export async function getGames() {
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
  return games;
}
