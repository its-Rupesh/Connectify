// import React from "react";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";
import { getLast7Days } from "../../lib/feature";

ChartJS.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);
const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    Legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true, grid: { display: false } },
  },
};
export const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value, // Y-axis values
        label: "Revenue", // Name of the dataset
        fill: true, // This enables the fill below the line
        backgroundColor: "rgba(75,192,192,0.2)", // Fill color under the line
        borderColor: "rgba(75,192,192,1)", // Line color
        pointBackgroundColor: "rgba(75,192,192,1)", // Point color
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        tension: 0.4, // Optional: Adds smoothness to the line curve
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};
export const DoughnutChart = () => {
  return <div>Chart</div>;
};
