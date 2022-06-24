import { Game } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getGames } from "./api/games";
import styled from "styled-components";
import { useRouter } from "next/router";

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
    <div className={styles.container}>
      <Head>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@2.17.0/dist/full.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.tailwindcss.com"></script>
        <title>Next-Typer</title>
        <meta
          name="description"
          content="Simple app calculating typing speed"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="container mx-auto">
          <div className="btn-group btn-group-vertical max-w-sm">
            {games.map((g) => (
              <button key={g.id} onClick={(e) => gameClickHandler(e, g.id)} className="btn m-3">{g.title}</button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export async function getServerSideProps() {
  const games = await getGames();
  return {
    props: {
      games
    },
  };
}

export default styled(Games)`
button {
  margin: 10px !important;
}
`;
