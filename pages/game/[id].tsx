import GameBody from "@components/game-body";
import GameBoard from "@components/game-board";
import Layout from "@components/layout";
import Player from "@components/player";
import { Game } from "@prisma/client";
import type { NextPage } from "next";
import { getGameById } from "pages/api/game-by-id";
import styled from "styled-components";
import Link from 'next/link';

interface IGamePage { game: Game };

const GamePage: NextPage<IGamePage> = ({ game }: IGamePage) => {
  return (
    <Layout>
      <>
        <Link href="/games">
          <a className="btn btn-link border-4 border-white border-double m-2 hover:no-underline hover:border-white hover:border-solid hover:bg-yellow-400 hover:text-black">Back</a>
        </Link>
        <Player />
        <GameBoard game={game} />
        <GameBody game={game} />
      </>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  const game = await getGameById(Number(context.query.id));
  return {
    props: {
      game
    },
  };
}

export default styled(GamePage)`
`;
