// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@services/internal";
import { generateText } from "@utils/common";

type TPostGame = {
  title: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const data = req.body as TPostGame;
      const gameId = await generateGame(data.title);
      res.status(200).json({ id: gameId });
      break;
    default:
      const games = await getGames();
      res.status(200).json(games);
      break;
  }
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

export async function generateGame(title: string): Promise<number> {
  const game = await prisma.game.create({
    data: {
      title,
      text: generateText(10)
    },
  });
  return game.id;
}
