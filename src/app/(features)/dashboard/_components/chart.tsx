"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from "chart.js";
import { DateTime } from "luxon";

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
  },
};

const generateDates = () => {
  const now = DateTime.now();
  const later = now.plus({ week: 7 });
  return new Array(7)
    .fill(0)
    .map((_, i) => later.minus({ day: i }).toISODate());
};

const labels = generateDates();

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random()),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      lineTension: 0.6,
    },
  ],
};

export function Chart() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  return <Line options={options} data={data} />;
}
