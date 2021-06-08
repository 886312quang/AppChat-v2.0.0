import { Card, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import HighMaps from "../Chart/HightMaps";
import LineChart from "../Chart/LineChart";

export default function Summary({ report, selectedCountryId }) {
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

  const [map, setMap] = useState({});

  useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
      ).then((res) => setMap(res));
    }
  }, [selectedCountryId]);

  return (
    <div {...layout}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <LineChart data={report} />
        </Col>
        <Col span={12}>
          <HighMaps mapData={map} />
        </Col>
      </Row>
    </div>
  );
}
