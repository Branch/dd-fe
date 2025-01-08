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
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      title: {
        text: "Hundår",
        display: true,
      },
    },
    y: {
      title: {
        display: true,
        text: "Människoår",
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Hundår till människoår över tid",
    },
  },
};

export default function Calculator() {
  const [dogAge, setDogAge] = useState(1);
  const [humanAge, setHumanAge] = useState(0);

  const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const data = {
    labels,
    datasets: [
      {
        label: "Din hund",
        data: [{ x: dogAge, y: humanAge }],
        borderColor: "#357729",
        backgroundColor: "#F9DE7C",
        borderWidth: 3,
        pointRadius: 10, // Larger dot size
        pointHoverRadius: 15, // Even larger on hover
      },
      {
        tension: 0.3,
        label: "Människoår",
        data: [
          0, 31, 42.1, 48.6, 53.2, 56.8, 59.7, 62.1, 64.3, 66.2, 67.8, 69.4,
          70.8, 72, 73.2, 74.3,
        ],
        borderColor: "#357729",
        backgroundColor: "#E2F5D6",
      },
    ],
  };
  useEffect(() => {
    setHumanAge(parseFloat((16 * Math.log(dogAge) + 31).toFixed(1)));
  }, [dogAge]);
  return (
    <>
      <div className="flex flex-col gap-6 pt-8 px-8 pb-4 my-4 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-start w-full">
          <label
            htmlFor="numericInput"
            className="text-gray-700 font-bold mb-2"
          >
            Din hunds ålder
          </label>
          <input
            value={dogAge}
            onChange={(e) => setDogAge(e.currentTarget.valueAsNumber)}
            type="number"
            min={1}
            max={15}
            id="numericInput"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            placeholder="Ålder"
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <input
            onChange={(e) => setDogAge(e.currentTarget.valueAsNumber)}
            type="range"
            min="1"
            max="15"
            value={dogAge}
            className="w-full cursor-pointer [&::-webkit-slider-thumb]:w-4
  [&::-webkit-slider-thumb]:h-4
  [&::-webkit-slider-thumb]:-mt-0.5
  [&::-webkit-slider-thumb]:appearance-none
  [&::-webkit-slider-thumb]:bg-djungleYellow
  [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(53,120,41,1)]
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:transition-all
  [&::-webkit-slider-thumb]:duration-150
  [&::-webkit-slider-thumb]:ease-in-out
  [&::-moz-range-thumb]:w-3.5
  [&::-moz-range-thumb]:h-3.5
  [&::-moz-range-thumb]:appearance-none
  [&::-moz-range-thumb]:bg-djungleYellow
  [&::-moz-range-thumb]:border-4
  [&::-moz-range-thumb]:border-blue-600
  [&::-moz-range-thumb]:rounded-full
  [&::-moz-range-thumb]:transition-all
  [&::-moz-range-thumb]:duration-150
  [&::-moz-range-thumb]:ease-in-out appearance-none h-2 mb-2 bg-djungleBlack/10 rounded-lg focus:outline-none"
          />
          <div className="w-full flex justify-between text-sm text-gray-500 mt-1">
            <span>1</span>
            <span>15</span>
          </div>
        </div>
        <div>
          {dogAge > 0 && !isNaN(humanAge) ? (
            <>
              <div className="text-left text-xl">{dogAge} hundår är</div>
              <div className="flex gap-4 mt-2">
                <div className="font-bold max-w-[200px]">
                  <span className="text-6xl mr-2">{humanAge}</span>
                  människoår
                </div>
              </div>
              <p className="text-[11px] mt-8 text-djungleBlack-100/80">
                <strong>Beräkningen görs enligt följande formel:</strong>{" "}
                Människoår = 16 x ln(hundår) + 31{" "}
                <a
                  href="https://www.cell.com/cell-systems/fulltext/S2405-4712%2820%2930203-9#gr3"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-djungleBlue"
                >
                  <br></br>
                  Formeln är framtagen i en forskningsstudie genomförd av den
                  vetenskapliga tidskriften Cell år 2020.
                </a>
              </p>
            </>
          ) : (
            <p className="font-bold text-destructive">
              {isNaN(dogAge)
                ? "Ange ett giltigt nummer!"
                : `${dogAge} hundår är en för låg ålder för att omvandla till människoår!`}
            </p>
          )}
        </div>
      </div>
      <p className="my-12">
        I grafen nedan kan du se att förhållandet mellan hundår och människoår
        inte är linjärt utan ökar snabbt de första åren och avtar ju äldre
        hunden blir.
      </p>
      {/* @ts-expect-error unsupported types */}
      <Line options={options} data={data} />
    </>
  );
}
