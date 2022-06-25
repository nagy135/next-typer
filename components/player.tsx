import { ChangeEvent, useState } from "react";
import { useGlobalContext } from "./contexts/global";

const Player: React.FC = () => {

  const global = useGlobalContext();
  return (
    <div className="container mx-auto">
      <div className="form-control flex max-w-md">
        <label className="label">
          <span className="label-text">Start game</span>
        </label>
        <label className="input-group input-group">
          <span>Enter nickname</span>
          <input type="text" value={global.nickname} onChange={e => global.setNickname(e.target.value)} placeholder="Player1" className="input input-bordered" />
        </label>
        <button className="btn btn-primary mt-2">Click here {global.nickname}</button>
      </div>
    </div>
  );
};

export default Player;
