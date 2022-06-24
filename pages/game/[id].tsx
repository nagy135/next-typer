import { Game } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";

interface IGames {
  games: Game[];
}

const GamePage: NextPage<IGames> = ({ games }: IGames) => {
  const router = useRouter();
  console.log("================\n", "router: ", router.query.id, "\n================");
  return (
    <div>
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
          <div className="form-control max-w-md">
            <label className="label">
              <span className="label-text">Start game</span>
            </label>
            <label className="input-group input-group">
              <span>Enter nickname</span>
              <input type="text" placeholder="Player1" className="input input-bordered" />
            </label>
          </div>
        </div>
      </main>
    </div>
  );
};
// export async function getServerSideProps() {
// const games = await getGames();
// return {
//   props: {
//     games
//   },
// };
// }

export default styled(GamePage)`
button {
  margin: 10px !important;
}
`;
