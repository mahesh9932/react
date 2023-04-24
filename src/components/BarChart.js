import React from "react";
import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Chart, ArcElement } from "chart.js";
import { registerables } from "chart.js";

Chart.register(...registerables);
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(ChartDataLabels);

const BarChart = () => {
  const [data, setData] = useState([]);
  console.log("hi2");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://3.23.130.250:4000/barChartData");
      console.log("result", result.data);
      setData(result.data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Spending Value",
        data: Object.values(data),
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default BarChart;
