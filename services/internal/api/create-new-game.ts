/**
 *  calls api to generate new game, refreshes page
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (gameName: string): Promise<void> => {
  await fetch("/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: gameName,
    }),
  });
};
