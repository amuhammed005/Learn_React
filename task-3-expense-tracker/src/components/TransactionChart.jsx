// components/TransactionChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TransactionChart({ data }) {
  const income = data
    .filter((item) => item.amount > 0)
    .reduce((acc, cur) => acc + cur.amount, 0);

  const expense = data
    .filter((item) => item.amount < 0)
    .reduce((acc, cur) => acc + Math.abs(cur.amount), 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"], // green, red
        borderColor: ["#16a34a", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-4 shadow-md rounded mb-6">
      <h3 className="text-center font-semibold mb-2">Income vs Expense</h3>
      <Doughnut data={chartData} options={options} />
    </div>
  );
}
