import { useGlobalContext } from "./contexts/global";
import styled from "styled-components";

const Player: React.FC = () => {
  const global = useGlobalContext();
  return global.playing ? null : (
    <StyledDiv className="container mx-auto">
      <div className="form-control flex max-w-md">
        <label className="label">
          <span className="label-text">Start game</span>
        </label>
        <label className="input-group input-group">
          <span>Enter nickname</span>
          <input
            type="text"
            value={global.nickname}
            onChange={(e) => global.setNickname(e.target.value)}
            placeholder="Player1"
            className="input input-bordered"
          />
        </label>
      </div>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  opacity: 1;
  transition: opacity 1s;
`;

export default Player;
