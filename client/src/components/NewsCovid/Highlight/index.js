import { Card, Col, Row } from "antd";
import React from "react";
import HighlightCard from "./HighlightCard";

export default function Highlight({ report }) {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const data = report && report.length ? report[report.length - 1] : [];
  const summary = [
    {
      title: "Số ca nhiễm",
      count: data.Confirmed,
      type: "confirmed",
      color: "#c9302c",
    },
    {
      title: "Bình phục",
      count: data.Recovered,
      type: "recovered",
      color: "#28a745",
    },
    { title: "Tử vong", count: data.Deaths, type: "death", color: "gray" },
  ];

  return (
    <div>
      <Row gutter={[16, 40]}>
        {summary.map((item, index) => (
          <HighlightCard
            key={index}
            title={item.title}
            count={item.count}
            color={item.color}
          />
        ))}
      </Row>
    </div>
  );
}
