import { TPlayerProgress } from "@services/internal/api/get-game-progresses";
import { useState } from "react";
import WpmGraph, { TWpmGraphData } from "./wpm-graph";
import Api from "services/internal/api";

interface IProgressTable {
  progresses: TPlayerProgress[];
  gameId: number;
}
const ProgressTable: React.FC<IProgressTable> = ({ progresses, gameId }) => {
  const [wpmGraphData, setWpmGraphData] = useState<TWpmGraphData | null>(null);

  const wpmLabelClick = async (userId: number) => {
    const responseData = await Api.getGameProgresses(gameId, userId);
    const newWpmGraphData: TWpmGraphData = {
      dataX: [],
      dataY: [],
    };
    for (const record of responseData) {
      newWpmGraphData.dataY.push(record.progress.toString());
      newWpmGraphData.dataX.push(record.wpm);
    }
    setWpmGraphData(newWpmGraphData);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Progress (max)</th>
            <th>Wpm (max)</th>
            <th>graph</th>
          </tr>
        </thead>
        <tbody>
          {progresses.map((e, i) => (
            <tr key={`progressRecord_${i}`}>
              <td>{e.userName}</td>
              <td>{e.progress}</td>
              <td>{e.wpm}</td>
              <td>
                <>
                  <label
                    onClick={() => wpmLabelClick(e.userId)}
                    htmlFor="wpm-modal"
                    className="btn modal-button"
                  >
                    WPM
                  </label>
                </>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <input type="checkbox" id="wpm-modal" className="modal-toggle" />
      <div className="modal cursor-pointer">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="wpm-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 text-white bg-red-600 hover:bg-white hover:text-red-600"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">WPM speed per percentage</h3>
          <p className="py-4 relative">
            <WpmGraph wpmGraphData={wpmGraphData} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTable;
