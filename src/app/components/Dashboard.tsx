"use client";
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import DoughnutChart from "./DoughnutChart";
import { UserData } from "@/app/Data";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";

const userToken = "976hgyfucuvbk";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dashboard = () => {
  const [apiCallData, setApiCallData] = useState<any>();
  const [currMonth, setCurrMonth] = useState("January");

  const [invoices, setInvoices] = useState("");

  const [loading, setLoading] = useState(true);

  const [dailyCost, setDailyCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);

  const [monthlyBillData, setMonthlyBillData] = useState({
    datasets: [
      {
        data: UserData.map((data: any) => data.userGain),
        fill: false,
        tension: 0.01,
      },
    ],
  });

  const [userData, setUserData] = useState({
    datasets: [
      {
        data: UserData.map((data: any) => data.userGain),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const getUsage = async () => {
      setLoading(true);
      let currMonthInt = 1;
      let indx = 1;
      for (let month of months) {
        if (month == currMonth) {
          currMonthInt = indx;
          break;
        }
        indx++;
      }
      const response = await fetch(
        `http://127.0.0.1:8000/usage/${currMonthInt}/${2024}?userToken=${userToken}`
      );
      const apiUsage = await response.json();
      // console.log(apiUsage);

      setApiCallData(apiUsage);

      const allApiCalls = [...apiUsage?.downloadDatas, ...apiUsage.chatDatas];

      const totalApiCalls =
        apiUsage?.downloadDatas?.length + apiUsage?.chatDatas?.length;
      const used = 1 * totalApiCalls;
      const expired = 18 - totalApiCalls;

      setDailyCost(used);
      setMonthlyCost(used);

      setUserData((prev: any) => ({
        ...prev,
        labels: Array.from(Array(31).keys()).map((day: any) => day + 1),
        datasets: [
          {
            data: Array.from(Array(31).keys()).map((day: any) => {
              return allApiCalls.filter((api: any) => api.day === day + 1)
                ?.length;
            }),
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }));

      setMonthlyBillData((prev: any) => ({
        ...prev,
        datasets: [
          {
            data: [used, expired],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: [
              "rgba(53, 203, 117, 0.8)",
              "rgba(255, 99, 132, 0.5)",
            ],
            tension: 0.01,
          },
        ],
      }));
      setLoading(false);
    };

    
    getUsage();
  }, [userToken,currMonth]);

  const handleMonthChange = (e: any) => {
    setCurrMonth(e.target.value);
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
        <>
          <Container>
            <h1 style={{ textDecoration: "underline", color: "gray" }}>
              Usage
            </h1>
            <Row
              style={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Col xs={6}>
                <Stack>
                  <div>
                    <Button
                      size="lg"
                      variant="success"
                      style={{
                        border: "1px solid green",
                        borderRadius: "10px 0px 0px 10px",
                        fontWeight: "bold",
                      }}
                    >
                      Cost
                    </Button>
                    <Button
                      size="lg"
                      variant="light"
                      style={{
                        border: "1px solid green",
                        borderRadius: "0px 10px 10px 0px",
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Activity
                    </Button>
                  </div>
                </Stack>
              </Col>
              <Col xs={4}>
                <Stack
                  direction="horizontal"
                  gap={2}
                  style={{ justifyContent: "flex-end" }}
                >
                  <div>
                    <select
                      name="monthPicker"
                      id="monthPicker1"
                      value={currMonth}
                      onChange={handleMonthChange}
                      style={{
                        background: "whitesmoke",
                        width: "130px",
                        padding: "8px",
                        height: "50px",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    >
                      {months.map((month: string) => {
                        return <option key={month}>{month}</option>;
                      })}
                    </select>
                  </div>
                  <Button size="lg" variant="success">
                    Export
                  </Button>
                </Stack>
              </Col>
            </Row>
            <hr />
            <Row style={{ alignItems: "flex-start", justifyContent: "center" }}>
              <Col xs={9}>
                <LineChart chartData={userData} cost={dailyCost} />
              </Col>
              <Col xs={3}>
                <DoughnutChart
                  chartData={monthlyBillData}
                  month={currMonth}
                  cost={monthlyCost}
                />
                <h3 style={{ marginTop: "70px" }}>Invoice</h3>
                <div style={{ margin: "30px 0px 50px 0px" }}>
                  {invoices ? invoices : "No invoices found"}
                </div>
              </Col>
            </Row>
          </Container>

          <Container style={{ marginBottom: "20vh" }}>
          <h1 style={{ textDecoration: "underline", color: "black" }}>
              Usage
            </h1>
            <h2 style={{color: "gray" }}>{currMonth} 2024</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Model</th>
                  <th scope="col">Type</th>
                  <th scope="col">Usage</th>
                  <th scope="col">Rate</th>
                  <th scope="col">Spend</th>
                </tr>
              </thead>
              <tbody style={{background:"whitesmoke"}}>
                {apiCallData?.downloadDatas?.map((dt:any)=>{
                  return <tr>
                  <td>{`/download/${dt.data_id}`}</td>
                  <td>text-generation</td>
                  <td>1 call</td>
                  <td>1 $/call</td>
                  <td>1 $</td>
                </tr>
                })}
                
                {apiCallData?.chatDatas?.map((dt:any)=>{
                  return <tr>
                  <td>{`/chat/${dt.chat_id}`}</td>
                  <td>text-generation</td>
                  <td>1 call</td>
                  <td>1 $/call</td>
                  <td>1 $</td>
                </tr>})}
              </tbody>
            </table>
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
