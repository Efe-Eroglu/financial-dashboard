import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Gerekli bileşenleri Chart.js'e kaydedin
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Heatmap = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>İzleme listesi bulunmamaktadır.</p>;
  }

  const symbols = data.map((item) => item.stock_symbol);
  const values = data.map((item) => item.price_change_percentage || 0);

  const chartData = {
    labels: symbols,
    datasets: [
      {
        label: "Fiyat Değişim Yüzdesi",
        data: values,
        backgroundColor: values.map((value) =>
          value > 0 ? "rgba(75, 192, 192, 0.8)" : "rgba(255, 99, 132, 0.8)"
        ),
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw}%`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { display: false },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default Heatmap;
