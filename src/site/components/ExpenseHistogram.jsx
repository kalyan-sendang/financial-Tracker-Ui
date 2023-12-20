import React, { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { expenseHelperFunc } from "../../services/expenseHelper";

function ExpenseHistogram({ chartsLoaded }) {
  const [expenseData, setExpenseData] = useState([]);

  const fetchExpenseData = async () => {
    const response = await axiosInstance.get("/expenseData");
    const returnArray = expenseHelperFunc(response?.data?.response);
    setExpenseData(returnArray);
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const expenseHistogram = () => {
    const expenseChart =
      window.google.visualization.arrayToDataTable(expenseData);

    var options = {
      title: "Expense per month per category",
      vAxis: {
        title: "Expense amount",
      },
      hAxis: {
        title: "Per month categories",
      },
    };

    const chart = new window.google.visualization.ColumnChart(
      document.getElementById("expense-chart")
    );

    chart.draw(expenseChart, options);
  };

  useEffect(() => {
    if (chartsLoaded) {
      window.google.charts.setOnLoadCallback(expenseHistogram);
    }
  }, [chartsLoaded]);

  return <div id="expense-chart"></div>;
}

export default ExpenseHistogram;
