// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@services/internal";
import { parseRequestBooleansAndNumbers } from "@utils/common";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  TCreateGameProgressRequest,
  TGetGameProgressesRequest,
} from "types/request";
import { TGameAllProgresses, TGameProgressStatsResponse } from "types/response";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const postData = req.body as TCreateGameProgressRequest;
      await createGameProgress(postData);
      res.status(200).json({});
      break;
    default:
      const getData = parseRequestBooleansAndNumbers(
        req.query
      ) as TGetGameProgressesRequest;

      if (getData.all)
        res.status(200).json(await getGameAllProgresses(getData));
      else res.status(200).json(await getGameProgressStats(getData));

      break;
  }
}

const getGameAllProgresses = async (
  data: TGetGameProgressesRequest
): Promise<TGameAllProgresses> => {
  return await prisma.progress.findMany({
    where: {
      gameId: data.gameId,
    },
  });
};

const getGameProgressStats = async (
  data: TGetGameProgressesRequest
): Promise<TGameProgressStatsResponse[]> => {
  const progresses = await prisma.progress.groupBy({
    by: ["playerId"],
    _max: {
      progress: true,
      wpm: true,
    },
    where: {
      gameId: data.gameId,
    },
  });
  const players = await prisma.user.findMany({
    where: {
      id: {
        in: progresses.map((e) => e.playerId),
      },
    },
  });
  const playerIdNameMap: Record<number, string> = {};
  for (const player of players) {
    playerIdNameMap[player.id] = player.name ?? "unknown_name";
  }

  const result: TGameProgressStatsResponse[] = progresses.map((e) => {
    return {
      progress: e._max.progress ?? 0,
      wpm: e._max.wpm ?? 0,
      userName: playerIdNameMap[e.playerId],
    };
  });
  return result;
};

/**
 *  creates new progress on this game, if it already exists,
 *  do nothing (we allow replaying the same game but progress
 *  hould not change)
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
const createGameProgress = async (
  data: TCreateGameProgressRequest
): Promise<void> => {
  const progress = await prisma.progress.findFirst({
    where: {
      gameId: data.gameId,
      playerId: data.userId,
      progress: data.progress,
    },
  });
  if (progress) {
    await prisma.progress.update({
      where: {
        id: progress.id,
      },
      data: {
        wpm: data.wpm,
      },
    });
  } else {
    await prisma.progress.create({
      data: {
        progress: data.progress,
        gameId: data.gameId,
        playerId: data.userId,
        wpm: data.wpm,
      },
    });
  }
};
