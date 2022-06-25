import { useGlobalContext } from "@components/contexts/global";
import GameBoard from "@components/game-board";
import Layout from "@components/layout";
import Player from "@components/player";
import { Game } from "@prisma/client";
import type { NextPage } from "next";
import { getGameById } from "pages/api/game-by-id";
import styled from "styled-components";

interface IGamePage { game: Game };

const GamePage: NextPage<IGamePage> = ({ game }: IGamePage) => {
  return (
    <Layout>
      <>
        <Player />
        <GameBoard game={game} />
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
