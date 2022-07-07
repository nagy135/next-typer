/**
 *  calls api to generate new game, refreshes page
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
export default async (userName: string): Promise<number> => {
  return (
    await (
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
        }),
      })
    ).json()
  ).id;
};
