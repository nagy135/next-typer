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
        <title>Next-Typer</title>
        <meta
          name="description"
          content="Simple app calculating typing speed"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {games.map((e) => (
            <li>
              <div>
                <p>{e.title}</p>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};
export async function getServerSideProps() {
  const games = await getGames();
  return {
    props: {
      games: games.map((e) => {
        return {
          ...e,
          createdAt: e.createdAt.toString(),
          updatedAt: e.updatedAt.toString(),
        };
      }),
    },
  };
}

export default Games;
