import { ChartOptions } from "chart.js";
import {
  CustomDoughnutTooltip,
  CustomTooltip,
} from "./components/CustomTooltip";

export const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: CustomTooltip,
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
      },
      border: {
        display: false,
      },
      ticks: {
        padding: 20,
      },
    },
    y: {
      display: true,
      title: {
        display: false,
      },
      grid: {
        display: false,
        drawTicks: true,
      },
      ticks: {
        display: true,
        stepSize: 10000,
        padding: 60,
        callback: function (value: string | number) {
          const numValue =
            typeof value === "string" ? parseInt(value, 10) : value;
          if (numValue >= 1000) {
            const formatted = numValue / 1000;
            return formatted.toFixed(formatted % 1 === 0 ? 0 : 1) + "k";
          }
          return value.toString();
        },
      },
    },
  },
};

export const doughnutChartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  cutout: '75%', 
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
      external: CustomDoughnutTooltip,
    },
  },
};

export const chartLabels = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
