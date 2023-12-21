import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { pieIncomeHelperFunc } from "../../services/incomeHelper";

function IncomePieChart() {
  const [incomeData, setIncomeData] = useState("");

  const fetchIncomeData = async () => {
    const response = await axiosInstance.get("/incomeData");
    const returnArray = pieIncomeHelperFunc(response?.data?.response);
    const year = 2023;

    setIncomeData(returnArray[year]);
  };

  useEffect(() => {
    fetchIncomeData();
  }, []);

  const incomePieChart = () => {
    const incomeChart =
      window.google.visualization.arrayToDataTable(incomeData);

    var options = {
      title: "Income per year per category",
      is3D: true,
    };

    const chart = new window.google.visualization.PieChart(
      document.getElementById("income-piechart")
    );

    chart.draw(incomeChart, options);
  };

  useEffect(() => {
    if (incomeData) {
      window.google.charts.setOnLoadCallback(incomePieChart);
    }
  }, [incomeData]);

  return <div id="income-piechart"></div>;
}

export default IncomePieChart;
