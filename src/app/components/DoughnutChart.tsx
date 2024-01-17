import React from "react";
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
  ArcElement,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

// import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  cutout: "70%",
  responsive: true,
  plugins: {
    title: {
      display: false,
      text: "Chart.js Doughnut Chart",
    },
  },
};

const DoughnutChart = ({ chartData, month, cost}: any) => {

  const doughnutLabel = {
    id:"doughnutLabel",
    afterDatasetsDraw(chart:any, args:any, plugins:any){
      const {ctx, data} = chart;
  
      const centerX = chart.getDatasetMeta(0)?.data?.[0]?.x;
      const centerY = chart.getDatasetMeta(0)?.data?.[0]?.y;
      const num = data?.datasets[0]?.data?.[0]*100/18;
  
      ctx.save();
      ctx.font = "bold 20px sans-serif";
      ctx.fillStyle = "gray";
      ctx.textAlign = "center";
      ctx.fillText(`${num?.toFixed(2)}%`,centerX,centerY);
    }
  }

  return (
    <Stack
      style={{
        alignItems: "flex-start",
        marginTop: "40px",
      }}
      gap={5}
    >
      <h5 style={{ fontWeight: "bolder" }}>
        Monthly Bill{" "}
        <span style={{ color: "gray", fontWeight: "lighter" }}>
          {month.slice(0, 3)} 1 - 31
        </span>
      </h5>
      <Stack direction="horizontal" gap={5}>
        <div style={{ height: "200px" }}>
          <Doughnut data={chartData} options={options} plugins={[doughnutLabel]}/>
        </div>
        <Stack style={{ alignItems: "center", justifyContent: "center" }}>
          <h6>${cost.toFixed(2)}</h6>
          <h6>/ $18.00</h6>
          <Button size="lg" variant="success" style={{ width: "160px" }}>
            Increase limit
          </Button>
        </Stack>
      </Stack>

      <Stack style={{ justifyContent: "flex-start" }} gap={4}>
        <h6 style={{ fontWeight: "bolder" }}>
          Credit Grants{" "}
          <span style={{ color: "gray", fontWeight: "lighter" }}>USD</span>
        </h6>
        <Stack
          direction="horizontal"
          gap={5}
          style={{ height: "18px", alignItems: "center" }}
        >
          <Stack
            direction="horizontal"
            style={{ alignItems: "center", marginLeft: "5px" }}
            gap={3}
          >
            <div
              style={{
                background: "rgba(53, 203, 117, 0.8)",
                width: "20px",
                height: "100%",
              }}
            ></div>
            <h6 style={{ marginTop: "7px" }}>Used</h6>
          </Stack>

          <Stack
            direction="horizontal"
            style={{ alignItems: "center" }}
            gap={1}
          >
            <div
              style={{
                background: "rgba(255, 99, 132, 0.5)",
                width: "20px",
                height: "100%",
              }}
            ></div>
            <h6 style={{ marginTop: "7px" }}>Expired</h6>
          </Stack>
        </Stack>

        <Stack
          direction="horizontal"
          gap={2}
        >
          <div
            style={{
              background: "rgba(255, 99, 132, 0.5)",
              width: "100%",
              height: "20px",
              borderRadius: "0px 20px 20px 0px",
            }}
          >
            <div
              style={{
                background: "rgba(53, 203, 117, 0.8)",
                width: `${cost/18*100}%`,
                height: "100%",
              }}
            ></div>
          </div>
          <h6 style={{marginTop:"4px"}}>${cost.toFixed(2)}/$18.00</h6>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DoughnutChart;
