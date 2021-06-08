import React, { useState, useEffect } from "react";
import HighchartReact from "highcharts-react-official";
import Hightchart from "highcharts";
import moment from "moment";
import ButtonGroup from "antd/lib/button/button-group";
import { Button } from "antd";

const generateOptions = (data) => {
  const categories = data.map((item) => moment(item.Date).format("DD/MM/YYYY"));

  return {
    chart: { height: 500 },
    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    colors: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "<table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      { name: "Tổng ca nhiễm", data: data.map((item) => item.Confirmed) },
    /*   { name: "Binh phuc", data: data.map((item) => item.Recovered) },
      { name: "tu vong", data: data.map((item) => item.Deaths) }, */
    ],
  };
};

export default function LineChart({ data }) {
  const [options, setOptions] = useState({});
  const [reportType, setReportType] = useState("");

  useEffect(() => {
    let customData = [];
    switch (reportType) {
      case "all":
        customData = data;
        break;
      case "30":
        customData = data.slice(data.length - 30);
        break;
      case "7":
        customData = data.slice(data.length - 7);
        break;
      default:
        customData = data;
        break;
    }
    setOptions(generateOptions(customData));
  }, [data, reportType]);
  return (
    <div>
      <ButtonGroup
        size="small"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button onClick={() => setReportType("all")}>Tất cả</Button>
        <Button onClick={() => setReportType("30")}>30 ngày</Button>
        <Button onClick={() => setReportType("7")}>7 ngày</Button>
      </ButtonGroup>
      <HighchartReact highcharts={Hightchart} options={options} />
    </div>
  );
}
