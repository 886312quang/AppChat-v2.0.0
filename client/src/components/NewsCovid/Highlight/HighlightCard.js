import { Col, Typography, Card } from "antd";
import React from "react";

const { Text } = Typography;

export default function HighlightCard({ title, count, color }) {
  return (
    <Col span={8}>
      <Card
        bordered={false}
        style={{ width: 460, borderLeft: `5px solid ${color}` }}
      >
        <Text>{title}: </Text>
        <Text strong>{count}</Text>
      </Card>
    </Col>
  );
}
