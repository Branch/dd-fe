/** @format */

"use client";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);
interface IRadarChart {
  labels: string[];
  data: number[];
}
export default function RadarChart({ labels, data }: IRadarChart) {
  const radarChartData = {
    labels: labels,
    datasets: [
      {
        label: "Betyg",
        data: data,
        backgroundColor: "rgba(224, 243, 198, 0.3)",
        borderColor: "rgba(52, 121, 40, 1)",
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false, // Hides the main chart label (legend)
      },
    },
    scales: {
      r: {
        min: 0, // Set the minimum value
        max: 5, // Set the maximum value
        ticks: {
          stepSize: 1, // Define step intervals
          callback: (value: number) => {
            if (value === 0 || value === 100) return value; // Ensure min/max are always displayed
            return value;
          },
        },
        pointLabels: {
          color: "black",
          font: {
            size:
              typeof window !== "undefined"
                ? window?.innerWidth < 600
                  ? 10
                  : 14
                : 14, // Smaller font on mobile
            weight: 700,
          },
        },
      },
    },
  };
  //@ts-expect-error options interface is not complete
  return <Radar data={radarChartData} options={options} />;
}
