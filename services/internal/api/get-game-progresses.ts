export type TPlayerProgress = {
  progress: number;
  wpm: number;
  userName: string;
};
/**
 *  calls api to generate new game, refreshes page
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (gameId: number): Promise<TPlayerProgress[]> => {
  return (
    await (
      await fetch(
        "/api/progresses?" +
          new URLSearchParams({
            gameId: gameId.toString(),
          })
      )
    ).json()
  ).map((e: any) => {
    return {
      progress: Number(e.progress),
      userName: e.userName,
      wpm: e.wpm,
    };
  });
};
