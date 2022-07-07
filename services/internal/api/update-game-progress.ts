/**
 *  updates progress of user in this game (reflected in leaderboard)
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (
  id: number,
  userId: number,
  progress: number
): Promise<void> => {
  await fetch(`/api/game/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      progress
    }),
  });
};
