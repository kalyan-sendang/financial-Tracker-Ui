import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { lineHelperFunc } from "../../services/LineHelper";

function LineChart() {
  const [linedata, setLineData] = useState("");

  const fetchExpenseAndIncomeData = async () => {
    const response = await axiosInstance.get("/expenseData");

    const res = await axiosInstance.get("/incomeData");
    const returnArray = lineHelperFunc(
      response?.data?.response,
      res?.data?.response
    );
    setLineData(returnArray);
  };

  useEffect(() => {
    fetchExpenseAndIncomeData();
  }, []);

  const lineChart = () => {
    const lineChart = window.google.visualization.arrayToDataTable(linedata);

    var options = {
      title: "Income vs Expense",
      vAxis: {
        title: "Amoount",
      },
      hAxis: {
        title: "Months",
      },
    };

    const chart = new window.google.visualization.LineChart(
      document.getElementById("line-chart")
    );

    chart.draw(lineChart, options);
  };

  useEffect(() => {
    if (linedata) {
      window.google.charts.setOnLoadCallback(lineChart);
    }
  }, [linedata]);

  return <div id="line-chart"></div>;
}

export default LineChart;
