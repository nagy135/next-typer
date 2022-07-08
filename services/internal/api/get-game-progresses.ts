export type TPlayerProgress = {
  progress: number;
  wpm: number;
  userName: string;
  userId: number;
};
/**
 *  calls api to generate new game, refreshes page
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (
  gameId: number,
  playerId?: number
): Promise<TPlayerProgress[]> => {
  const params: Record<string, string> = {
    gameId: gameId.toString(),
  };
  if (playerId){
    params.all = "true";
    params.playerId = playerId.toString();
  }

  return (
    await (await fetch("/api/progresses?" + new URLSearchParams(params))).json()
  ).map((e: any) => {
    return {
      progress: Number(e.progress),
      userName: e.userName,
      wpm: e.wpm,
      userId: e.userId,
    };
  });
};
