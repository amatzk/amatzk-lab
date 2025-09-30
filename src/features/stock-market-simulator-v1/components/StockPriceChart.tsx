import type { ChartData, ChartOptions } from "chart.js";
import { createMemo } from "solid-js";
import { LineChart } from "~/components/ui/charts";

import { useModel } from "./Provider";

const baseOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 0 },
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        usePointStyle: true,
        boxWidth: 8,
        boxHeight: 8,
        color: "hsl(240, 3.8%, 46.1%)",
        font: { size: 12 },
      },
    },
    tooltip: {
      callbacks: {
        title: () => "",
        label: (context) => {
          const label = context.dataset.label || "";
          const point = context.parsed;
          return [`${label}`, `ID: ${point.x}`, `値: ¥${point.y}`];
        },
      },
    },
  },
};

const StockPriceChart = () => {
  const model = useModel();
  const { state } = model;

  const chartData = createMemo((): ChartData<"line"> => {
    const labels = state.stockPriceHistory.map((record) =>
      record.id.toString(),
    );

    return {
      labels,
      datasets: [
        {
          label: "株価履歴",
          data: state.stockPriceHistory.map((record) => ({
            x: record.id,
            y: record.price,
          })),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: false,
          pointRadius: 0,
        },
      ],
    };
  });

  const options = createMemo((): ChartOptions<"line"> => {
    return {
      ...baseOptions,
      scales: {
        x: {
          border: { display: false },
          grid: { display: true, color: "rgba(0,0,0,0.1)" },
          type: "linear",
          position: "bottom",
          title: { display: true, text: "取引ID" },
          min: 0,
        },
        y: {
          border: { display: false },
          grid: { display: true, color: "rgba(0,0,0,0.1)" },
          title: { display: true, text: "価格 (¥)" },
          min: 0,
        },
      },
    };
  });

  return (
    <div class="w-full h-[400px]">
      <LineChart
        data={chartData()}
        options={options()}
      />
    </div>
  );
};

export { StockPriceChart };
