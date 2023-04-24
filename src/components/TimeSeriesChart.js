import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import axios from "axios";
import { Chart } from "chart.js";

function TimeSeriesChart({ data }) {
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    // Parse the date using D3's timeParse method
    const parseDate = d3.timeParse("%Y-%m-%d");
    const fetchData = async () => {
      console.log("hi");
      const result = await axios.get("http://3.23.130.250:4000/timeSeriesData");
      console.log(result.data);

      const formattedData = Object.entries(result.data).map((d) => ({
        date: parseDate(d[0]),
        value: d[1],
      }));
      const sortedData = Object.entries(formattedData)
        .sort(([date1], [date2]) => new Date(date1) - new Date(date2))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

      console.log(sortedData);
      setChartData(sortedData);
    };

    fetchData();
    // Convert the data to the appropriate format for D3
  }, []);

  const chartConfig = {
    type: "line",
    data: {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "Data",
          data: Object.values(chartData),
          borderColor: "rgb(75, 192, 192)",
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "day",
              displayFormats: {
                day: "MMM D",
              },
            },
          },
        ],
      },
    },
  };

  const myChart = new Chart(chartRef.current, chartConfig);

  return <canvas id="new" ref={chartRef} />;
}

export default TimeSeriesChart;
