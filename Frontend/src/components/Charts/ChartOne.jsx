import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const ChartOne = (props) => {
  return <Doughnut data={props.datas}  />;
};

export default ChartOne;



