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
        color: "hsl(240,3.8%,46.1%)",
        font: { size: 12 },
      },
    },
    tooltip: {
      callbacks: {
        title: () => "",
        label: (ctx) => {
          const label = ctx.dataset.label ?? "";
          const { x, y } = ctx.parsed;
          return [`${label}`, `ID: ${x}`, `価格: ¥${y.toLocaleString()}`];
        },
      },
    },
  },
};

const AssetChart = () => {
  const { state } = useModel();

  const chartData = createMemo<ChartData<"line">>(() => ({
    labels: state.assetHistory.map((r) => r.id.toString()),
    datasets: [
      {
        label: "時価総額",
        data: state.assetHistory as any[],
        borderColor: "rgb(255,99,132)",
        backgroundColor: "rgba(255,99,132,0.2)",
        fill: false,
        pointRadius: 0,
        parsing: {
          xAxisKey: "id",
          yAxisKey: "marketCapitalization",
        },
      },
      {
        label: "現金総額",
        data: state.assetHistory as any[],
        borderColor: "rgb(54,162,235)",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: false,
        pointRadius: 0,
        parsing: {
          xAxisKey: "id",
          yAxisKey: "totalCash",
        },
      },
      {
        label: "総資産額",
        data: state.assetHistory as any[],
        borderColor: "rgb(75,192,192)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: false,
        pointRadius: 0,
        parsing: {
          xAxisKey: "id",
          yAxisKey: "totalAssets",
        },
      },
    ],
  }));

  const options = createMemo<ChartOptions<"line">>(() => {
    return {
      ...baseOptions,
      scales: {
        x: {
          type: "linear",
          position: "bottom",
          title: { display: true, text: "取引ID" },
          min: 0,
          grid: { color: "rgba(0,0,0,0.1)" },
          border: { display: false },
        },
        y: {
          title: { display: true, text: "金額 (¥)" },
          min: 0,
          grid: { color: "rgba(0,0,0,0.1)" },
          border: { display: false },
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

export { AssetChart };
