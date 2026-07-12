import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BookingChart = ({ data }) => {
  // If no data, show dummy months
  const labels = data?.map(d => d.date) || ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const counts = data?.map(d => d.count) || [12, 19, 8, 15, 22, 30];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Bookings",
        data: counts,
        backgroundColor: "#4CAF50",
        borderRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      },
      tooltip: {
        enabled: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5
        }
      }
    }
  };

  return (
    <div style={{ height: "250px", width: "100%" }}>
      <Chart type="bar" data={chartData} options={options} />
    </div>
  );
};

export default BookingChart;