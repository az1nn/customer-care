import React, { useState, useEffect, useRef } from "react";
import styles from "./Financeiro.module.scss";
import { Accordion, Subtitle, Text } from "mondrian-react";
import {
  ArcElement,
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import {
  verticalLinePlugin,
  xAxisHoverPlugin,
} from "./components/CustomTooltip.ts";
import {
  lineChartOptions,
  doughnutChartOptions,
  chartLabels,
} from "./chartConfig";
import classNames from "../../utils/classnames.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
  verticalLinePlugin,
  xAxisHoverPlugin
);
const Financeiro: React.FC = () => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const dougChartRef = useRef<ChartJS<"doughnut">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });
  const [dougChartData, setDougChartData] = useState<ChartData<"doughnut">>({
    datasets: [],
  });

  const accordionData = [
    { color: "#333333", label: "Cloud", value: 3500 },
    { color: "#FF8C00", label: "Infra", value: 2800 },
    { color: "#003399", label: "SOC", value: 1900 },
    { color: "#FFD700", label: "Segurança", value: 1200 },
    { color: "#A020F0", label: "IOT", value: 800 },
  ];

  useEffect(() => {
    const chart = chartRef.current;
    const dougChart = dougChartRef.current;
    if (!chart || !dougChart) return;

    const lineChartData = {
      labels: chartLabels,
      datasets: [
        {
          label: "Dataset 1",
          data: [
            10000, 20000, 30000, 25000, 40000, 20000, 50000, 30000, 40000,
            20000, 35000, 50000,
          ],
          borderColor: "#DA291C",
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointHoverBackgroundColor: "#DA291C",
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    };

    const dougData = {
      labels: ["Cloud", "Infra", "SOC", "Segurança", "IOT"],
      datasets: [
        {
          label: "Dataset 1",
          data: [12, 19, 3, 5, 2],
          backgroundColor: [
            "#333333",
            "#FF8C00",
            "#003399",
            "#FFD700",
            "#A020F0",
          ],
        },
      ],
    };

    setChartData(lineChartData);
    setDougChartData(dougData);
  }, []);

  return (
    <main className={styles.main_page}>
      <div className={styles.title_container}>
        <Subtitle xs>Acompanhamento de faturas</Subtitle>
        <button className={styles.date_filter}>
          <span
            className="mdn-Icon-calendario mdn-Icon--md"
            aria-label="calendario"
          ></span>
          <Text body md>
            Filtrar por Data
          </Text>
        </button>
      </div>

      <div className={classNames(styles.card_container, styles.line_chart)}>
        <Chart
          ref={chartRef}
          type="line"
          data={chartData}
          options={lineChartOptions}
        />
      </div>

      <div
        className={classNames(styles.card_container, styles.doug_chart)}
        style={{ position: "relative" }}
      >
        <Chart
          ref={dougChartRef}
          type="doughnut"
          data={dougChartData}
          options={doughnutChartOptions}
        />
        <div className={styles.doug_chart_overlay}>
          <div className={styles.doug_chart_title}>TOTAL DAS FATURAS</div>
          <div className={styles.doug_chart_value}>R$ 10.200,00</div>
        </div>
      </div>

      <div className={classNames(styles.card_container, styles.accordion)}>
        <Accordion
          data={accordionData.map((item) => {
            return {
              content: `
                  Detalhes sobre ${item.label}: informações relevantes sobre esta
                  categoria de serviço.`,
              title: (
                <span
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    minWidth: "500px"
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minWidth: "20%",
                      marginRight: "20%",
                    }}
                  >
                    <span
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <span>{item.label}</span>
                  </span>

                  <span
                    style={{
                      backgroundColor: "#F2F2F2",
                      borderRadius: "6px",
                      padding: "2px 8px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Vencimento: 20/08
                  </span>

                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      width: "20%",
                      marginLeft: "20%",
                    }}
                  >
                    R$ {item.value.toLocaleString("pt-BR")}
                  </span>
                </span>
              ),
            };
          })}
        />
      </div>
    </main>
  );
};

export default Financeiro;
