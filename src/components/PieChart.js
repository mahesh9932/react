import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
Chart.register(ChartDataLabels);

const PieChart = () => {
  const [data, setData] = useState([]);
  console.log("hi");
  useEffect(() => {
    const fetchData = async () => {
      console.log("hi");
      const result = await axios.get("http://3.23.130.250:4000/data");
      console.log(result.data);
      setData(result.data);
    };
    fetchData();
  }, []);

  let regionData = data;

  console.log("regionData", regionData);

  const chartData = {
    labels: Object.keys(regionData),
    datasets: [
      {
        data: Object.values(regionData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  console.log("chartData", chartData);

  const options = {
    legend: {
      position: "bottom",
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Total spend per region",
        padding: {
          bottom: 30,
        },
        weight: "bold",
        color: "#00325c",
        font: {
          size: 13,
        },
        align: "start",
      },
      datalabels: {
        display: true,
        color: "black",
      },
    },
  };

  return (
    <div>
      <h2>Pie Chart by Region</h2>
      <Pie data={chartData} plugins={[ChartDataLabels]} options={options} />
    </div>
  );
};

export default PieChart;
