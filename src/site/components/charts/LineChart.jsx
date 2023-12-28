import { useEffect, useState } from "react";
import { lineHelperFunc } from "../../../services/LineHelper";

function LineChart({ expenseData, incomeData }) {
  const [linedata, setLineData] = useState("");

  const fetchExpenseAndIncomeData = async () => {
    const returnArray = lineHelperFunc(expenseData, incomeData);
    setLineData(returnArray);
  };

  useEffect(() => {
    if (incomeData && expenseData) fetchExpenseAndIncomeData();
    //eslint-disable-next-line
  }, [incomeData, expenseData]);

  const lineChart = () => {
    const lineChart = window.google.visualization.arrayToDataTable(linedata);

    var options = {
      title: "Income vs Expense (2023)",
      vAxis: {
        title: "Amount",
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
    //eslint-disable-next-line
  }, [linedata]);

  return <div id="line-chart"></div>;
}

export default LineChart;
