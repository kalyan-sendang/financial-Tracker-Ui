import { useEffect, useState } from "react";
import { lineHelperFunc } from "../../services/LineHelper";

function LineChart({ expenseData, incomeData }) {
  const [linedata, setLineData] = useState("");

  const fetchExpenseAndIncomeData = async () => {
    const returnArray = lineHelperFunc(expenseData, incomeData);
    setLineData(returnArray);
  };

  useEffect(() => {
    if (incomeData && expenseData) fetchExpenseAndIncomeData();
  }, [incomeData, expenseData]);

  const lineChart = () => {
    const lineChart = window.google.visualization.arrayToDataTable(linedata);

    var options = {
      title: "Income vs Expense",
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
  }, [linedata]);

  return <div id="line-chart"></div>;
}

export default LineChart;
