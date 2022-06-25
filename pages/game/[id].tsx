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
        <div className="hero mt-2 bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">{game.title}</h1>
              <p className="py-6">{game.text}</p>
              <button className="btn btn-primary">Play</button>
            </div>
          </div>
        </div>
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
