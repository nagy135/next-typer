import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IWpmGraph {
  wpmGraphData: TWpmGraphData | null;
}
export type TWpmGraphData = {
  dataX: number[];
  dataY: string[];
};
const WpmGraph: React.FC<IWpmGraph> = ({ wpmGraphData }) => {
  if (!wpmGraphData) return null;

  const { dataX, dataY } = wpmGraphData;
  const options = {
    chart: {
      height: 350,
      toolbar: {
        show: false
        },
      type: "line" as const,
      zoom: {
        enabled: false,
      },
    },
    markers: {
      colors: ["#00ff00", "#E91E63", "#9C27B0"],
    },
    colors: ["#19a85b"],
    stroke: {
      curve: "smooth" as const,
    },
    xaxis: {
      categories: dataY,
      labels: {
        style: {
          colors: "#b2d3d9",
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: 'dark'
    },
    yaxis: {
      labels: {
        style: {
          colors: "#b2d3d9",
        },
      },
    },
  };

  const data = [
    {
      name: "WPM",
      data: dataX,
    },
  ];

  return <Chart options={options} series={data} width={"100%"}/>;
};

export default WpmGraph;
