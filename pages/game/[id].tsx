import Layout from "@components/layout";
import type { NextPage } from "next";
import styled from "styled-components";

interface IGamePage { };

const GamePage: NextPage<IGamePage> = ({ }: IGamePage) => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default styled(GamePage)`
button {
  margin: 10px !important;
}
`;
