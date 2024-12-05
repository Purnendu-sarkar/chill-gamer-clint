import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphComponent = ({ games }) => {
  const labels = games.map((game) => game.title);
  const ratings = games.map((game) => game.rating); 

  const data = {
    labels,
    datasets: [
      {
        label: "Game Ratings",
        data: ratings,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Game Ratings Chart (All Games)",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Bar data={data} options={options} />
    </div>
  );
};

export default GraphComponent;
