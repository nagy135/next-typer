/**
 *  updates progress of user in this game (reflected in leaderboard)
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (
  id: number,
  userId: number,
  progress: number,
  wpm: number
): Promise<void> => {
  await fetch(`/api/progresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId: id,
      userId,
      progress,
      wpm
    }),
  });
};
