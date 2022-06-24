import { Game } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getGames } from "./api/games";

interface IGames {
  games: Game[];
}

const Games: NextPage<IGames> = ({ games }: IGames) => {
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
        <div className="btn-group btn-group-vertical">
          {games.map((e) => (
            <button key={e.id} className="btn">{e.title}</button>
          ))}
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

export default Games;
