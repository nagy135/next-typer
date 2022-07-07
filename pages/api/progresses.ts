// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@services/internal";
import type { NextApiRequest, NextApiResponse } from "next";

type TCreateGameProgress = {
  gameId: number;
  userId: number;
  progress: number;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const data = req.body as TCreateGameProgress;
      await createGameProgress(data);
      break;
    default:
      const progresses = await prisma.progress.findMany();
      res.status(200).json(progresses);
      break;
  }
}

/**
 *  creates new progress on this game, if it already exists,
 *  do nothing (we allow replaying the same game but progress
 *  hould not change)
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
const createGameProgress = async (data: TCreateGameProgress): Promise<void> => {
  const progress = await prisma.progress.findFirst({
    where: {
      gameId: data.gameId,
      playerId: data.userId,
    },
  });
  if (progress) {
    await prisma.progress.update({
      where: {
        id: progress.id,
      },
      data: {
        progress: data.progress,
      },
    });
  } else {
    await prisma.progress.create({
      data: {
        progress: data.progress,
        gameId: data.gameId,
        playerId: data.userId,
      },
    });
  }
};
