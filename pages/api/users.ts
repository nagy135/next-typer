// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "@services/internal";
import type { NextApiRequest, NextApiResponse } from "next";

type TCreateUser = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  switch (req.method) {
    case "POST":
      const data = req.body as TCreateUser;
      const [userId, created] = await createUserIfNotExist(data.name);
      res.status(200).json({
        created,
        id: userId,
      });
      break;
    default:
      const users = await prisma.user.findMany();
      res.status(200).json(users);
      break;
  }
}

/**
 *  Creates new user if it doesnt exist, returning boolean
 *  flag whether it got created or existed already
 *
 * @author Viktor Nagy <viktor.nagy@01people.com>
 */
async function createUserIfNotExist(name: string): Promise<[number, boolean]> {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  if (user) return [user.id, false];

  const newUser = await prisma.user.create({
    data: {
      name,
    },
  });
  return [newUser.id, true];
}
