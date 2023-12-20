import { useEffect, useState } from "react";
import { incomeHelperFunc } from "../../services/incomeHelper";
import axiosInstance from "../../../axiosInstance";

function IncomeHistogram({ chartsLoaded }) {
  const [incomeData, setIncomeData] = useState([]);

  const fetchIncomeData = async () => {
    const response = await axiosInstance.get("/incomeData");
    const returnArray = incomeHelperFunc(response?.data?.response);
    setIncomeData(returnArray);
  };
  useEffect(() => {
    fetchIncomeData();
  }, []);

  const incomeHistogram = () => {
    const incomeChart =
      window.google.visualization.arrayToDataTable(incomeData);

    var options = {
      title: "Income per month per category",
      vAxis: {
        title: "Income amount",
      },
      hAxis: {
        title: "Per month categories",
      },
    };

    const chart = new window.google.visualization.ColumnChart(
      document.getElementById("income-chart")
    );

    chart.draw(incomeChart, options);
  };

  useEffect(() => {
    if (chartsLoaded) {
      window.google.charts.setOnLoadCallback(incomeHistogram);
    }
  });

  return <div id="income-chart"></div>;
}

export default IncomeHistogram;
