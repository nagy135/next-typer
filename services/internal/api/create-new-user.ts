/**
 *  calls api to generate new game, refreshes page
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (userName: string): Promise<void> => {
  await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userName
    }),
  });
};
