import { Game } from "@prisma/client";
import type { NextPage } from "next";
import { getGames } from "./api/games";
import styled from "styled-components";
import { useRouter } from "next/router";
import Layout from "@components/layout";
import NewGame from "@components/new-game";

interface IGames {
  games: Game[];
}

const Games: NextPage<IGames> = ({ games }: IGames) => {
  const router = useRouter();
  const gameClickHandler = (e: any, id: number) => {
    e.preventDefault();
    router.push(`/game/${id}`);
  };
  return (
    <Layout>
        <div className="container mx-auto">
        <NewGame />
          <div className="btn-group btn-group-vertical max-w-sm">
            {games.map((g) => (
              <button
                key={g.id}
                onClick={(e) => gameClickHandler(e, g.id)}
                className="btn m-3"
              >
                {g.title}
              </button>
            ))}
          </div>
        </div>
    </Layout>
  );
};
export async function getServerSideProps() {
  const games = await getGames();
  return {
    props: {
      games,
    },
  };
}

export default styled(Games)`
  button {
    margin: 10px !important;
  }
`;
