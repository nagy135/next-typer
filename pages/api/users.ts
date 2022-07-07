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
      res.status(200).json({
        created: await createUserIfNotExist(data.name),
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
async function createUserIfNotExist(name: string): Promise<boolean> {
  const user = await prisma.user.findFirst({
    where: {
      name,
    },
  });
  if (user) return false;

  await prisma.user.create({
    data: {
      name,
      email: "test@test.com",
    },
  });
  return true;
}
