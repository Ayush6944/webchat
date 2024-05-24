import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip,
  } from "chart.js";
  import React from "react";
  import { Doughnut, Line } from "react-chartjs-2";
  import { getLastPath } from "../../lib/Features";
import { orange, purple } from "@mui/material/colors";
  
  ChartJS.register(
    Tooltip,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Filler,
    ArcElement,
    Legend
  );
  
  const labels = getLastPath();
  
  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };
  
  const LineChart = ({ value = [10,25,41,16] }) => {
    const data = {
      labels,
      datasets: [
        {
          data: value,
          label: "Messages",
          fill: true,
          backgroundColor: 'lightgreen',
          borderColor: 'purple',
          pointBackgroundColor: 'yellow',
        },
      ],
    };
  
    return <Line data={data} style={{ zIndex: 10 }} options={lineChartOptions} />;
  };
  
  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: 120,
  };
  
  const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
      labels,
      datasets: [
        {
          data: value,
          backgroundColor: ['purple', 'orange'],
          hoverBackgroundColor: ['purple', 'orange'],
          borderColor: ['purple', 'orange'],
          offset: 40,
        },
      ],
    };
    return (
      <Doughnut
        style={{ zIndex: 10 }}
        data={data}
        options={doughnutChartOptions}
      />
    );
  };
  
  export { DoughnutChart, LineChart };
  