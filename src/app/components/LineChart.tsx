import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
// import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
};



const LineChart = ({ chartData, cost }: any) => {
  return (
    <>
      <h4 style={{fontWeight:"bolder"}}>Daily Costs <span style={{color:"gray"}}>${cost.toFixed(2)}</span></h4>
      <Line data={chartData} options={options} />
    </>
  );
};

export default LineChart;
