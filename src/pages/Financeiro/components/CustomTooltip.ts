import type { Chart } from 'chart.js';

type TooltipChartData = {
  labels: unknown[];
  datasets: { backgroundColor: string[] }[];
};

type TooltipDataPoint = {
  formattedValue: string;
  dataIndex: number;
};

type TooltipModel = {
  opacity: number;
  body?: unknown[];
  dataPoints: TooltipDataPoint[];
  caretX: number;
  caretY: number;
  chart: { data: TooltipChartData };
};

type ExternalTooltipContext = {
  chart: Chart;
  tooltip: TooltipModel;
};

type ActiveElement = { element: { x: number }; index: number };

type PluginChart = Chart & {
  tooltip?: { _active?: ActiveElement[] };
};

export function CustomTooltip(context: ExternalTooltipContext) {
  let tooltipEl = document.getElementById("custom-tooltip");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "custom-tooltip";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.zIndex = "100";
    document.body.appendChild(tooltipEl);
  }

  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  if (tooltipModel.body) {
    const value = tooltipModel.dataPoints[0].formattedValue;
    tooltipEl.innerHTML = `
      <div style="background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.09); border: 2px solid #eee; padding: 10px; min-width: 220px; text-align: center; font-family: Roboto;">
        <div style='font-size: 1.1rem; font-weight: bold; margin-bottom: 8px;'>Fatura fechada</div>
        <hr style='border: none; border-top: 1px solid #eee; margin: 8px 0;' />
        <div style='background: #F5F5F5; border-radius: 4px; padding: 6px 0; font-size: 0.9rem; font-weight: 600;'>Valor total: R$ ${value.replace(
          ".",
          ","
        )}</div>
      </div>
    `;
  }

  const position = context.chart.canvas.getBoundingClientRect();
  tooltipEl.style.opacity = "1";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX - 110 + "px";
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY - 110 + "px";
}

export function CustomDoughnutTooltip(context: ExternalTooltipContext) {
  let tooltipEl = document.getElementById("doughnut-custom-tooltip");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "doughnut-custom-tooltip";
    tooltipEl.style.position = "absolute";
    tooltipEl.style.pointerEvents = "none";
    tooltipEl.style.zIndex = "100";
    document.body.appendChild(tooltipEl);
  }

  const tooltipModel = context.tooltip;
  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  if (tooltipModel.body) {
    const dataIndex = tooltipModel.dataPoints[0].dataIndex;
    const label = tooltipModel.chart.data.labels[dataIndex] as string;
    const value = tooltipModel.dataPoints[0].formattedValue;
    const backgroundColor =
      tooltipModel.chart.data.datasets[0].backgroundColor[dataIndex];

    tooltipEl.innerHTML = `
      <div style="background: #fff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.09); border: 2px solid #eee; padding: 10px; min-width: 200px; text-align: center; font-family: Roboto;">
        <div style='display: flex; align-items: center; justify-content: center; margin-bottom: 8px;'>
          <div style='width: 12px; height: 12px; border-radius: 50%; background: ${backgroundColor}; margin-right: 8px;'></div>
          <div style='font-size: 1.1rem; font-weight: bold;'>${label}</div>
        </div>
        <hr style='border: none; border-top: 1px solid #eee; margin: 8px 0;' />
        <div style='background: #F5F5F5; border-radius: 4px; padding: 6px 0; font-size: 0.9rem; font-weight: 600;'>Total: R$ ${value.replace(
          ".",
          ","
        )}</div>
      </div>
    `;
  }

  const position = context.chart.canvas.getBoundingClientRect();
  tooltipEl.style.opacity = "1";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX - 100 + "px";
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY - 80 + "px";
}

export const verticalLinePlugin = {
  id: "verticalLinePlugin",
  afterDraw: (chart: PluginChart) => {
    if (chart.tooltip?._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      const activePoint = chart.tooltip._active[0];
      const x = activePoint.element.x;
      const yAxis = chart.scales?.y;

      if (!yAxis) {
        return;
      }

      const topY = yAxis.top;
      const bottomY = yAxis.bottom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#DA291C";
      ctx.stroke();
      ctx.restore();
    }
  },
};

type XAxisScale = {
  ticks: { label: string }[];
  bottom: number;
  ctx: { font: string };
  getPixelForTick: (index: number) => number;
};

export const xAxisHoverPlugin = {
  id: "xAxisHoverPlugin",
  afterDraw: (chart: PluginChart) => {
    if (chart.tooltip?._active && chart.tooltip._active.length) {
      const ctx = chart.ctx;
      const xAxis = chart.scales?.x as XAxisScale | undefined;

      if (!xAxis || !xAxis.ticks || !xAxis.bottom || !xAxis.getPixelForTick) {
        return;
      }

      const index = chart.tooltip._active[0].index;

      if (xAxis.ticks[index]) {
        ctx.save();
        ctx.fillStyle = "#DA291C";
        ctx.font = xAxis.ctx.font;
        ctx.textAlign = "center";
        const tick = xAxis.ticks[index];
        ctx.fillText(
          tick.label,
          xAxis.getPixelForTick(index),
          xAxis.bottom - 46.5
        );
        ctx.restore();
      }
    }
  },
};
