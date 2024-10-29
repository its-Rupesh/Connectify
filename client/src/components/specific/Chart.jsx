import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Chart as ChartJS,
  scales,
} from "chart.js";
import { X } from "@mui/icons-material";
import {
  lightorange,
  lightpurple,
  orange,
  purple,
} from "../../constants/color";
import { getLast7Days } from "../../lib/feature";
import zIndex from "@mui/material/styles/zIndex";

const labels = getLast7Days();

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const LineChart = ({ value = [] }) => {
  // Correctly structured `data` object
  const data = {
    labels: labels, // Labels for X-axis
    datasets: [
      {
        label: "Weekly Data", // Label for the dataset
        data: value, // Data points
        fill: true,
        backgroundColor: lightpurple, // Fill color under the line
        borderColor: purple, // Line color
        borderWidth: 2, // Line width
      },
    ],
  };

  const LineChartoptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { beginAtZero: true, grid: { display: false } },
    },
  };

  return <Line data={data} options={LineChartoptions} />;
};
const DoughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: { display: false },
    scales: {
      x: {
        display: false, // Disable x-axis
      },
      y: {
        display: false, // Disable y-axis
      },
      cutout: 120,
    },
  },
};
const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels, // Labels for X-axis
    datasets: [
      {
        data: value, // Data points
        backgroundColor: [lightpurple, lightorange], // Fill color under the line
        borderColor: [purple, orange], // Line color
        borderWidth: 2, // Line width
        hoverBackgroundColor: [purple, orange],
        offset: 12,
      },
    ],
  };
  return (
    <Doughnut
      style={{ zIndex: 10 }}
      data={data}
      options={DoughnutChartOptions}
    />
  );
};

export { LineChart, DoughnutChart };
