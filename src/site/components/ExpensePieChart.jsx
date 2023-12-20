import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { pieExpenseHelperFunc } from "../../services/expenseHelper";

function ExpensePieChart({ chartsLoaded }) {
  const [expenseData, setExpenseData] = useState([]);

  const fetchExpenseData = async () => {
    const response = await axiosInstance.get("/expenseData");
    const returnArray = pieExpenseHelperFunc(response?.data?.response);
    const year = 2023;

    setExpenseData(returnArray[year]);
  };

  useEffect(() => {
    fetchExpenseData();
  }, []);

  const expensePieChart = () => {
    const expenseChart =
      window.google.visualization.arrayToDataTable(expenseData);

    var options = {
      title: "Expense per month per category",
      is3D: true,
    };

    const chart = new window.google.visualization.PieChart(
      document.getElementById("expense-piechart")
    );

    chart.draw(expenseChart, options);
  };

  useEffect(() => {
    if (chartsLoaded) {
      window.google.charts.setOnLoadCallback(expensePieChart);
    }
  }, [chartsLoaded]);

  return <div id="expense-piechart"></div>;
}

export default ExpensePieChart;
