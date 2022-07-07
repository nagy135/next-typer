import { TPlayerProgress } from "@services/internal/api/get-game-progresses";

interface IProgressTable {
  progresses: TPlayerProgress[];
}
const ProgressTable: React.FC<IProgressTable> = ({ progresses }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {progresses.map((e, i) => (
            <tr key={`progressRecord_${i}`}>
              <td>{e.userName}</td>
              <td>{e.progress}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressTable;
