import React, { useEffect, useState } from "react";
import CountrySelector from "./CountrySelector";
import Highlight from "./Highlight";
import Summary from "./Summary";
import service from "../../services/covid";
import { sortBy } from "lodash";
import { Layout, Typography } from "antd";
import moment from "moment";

const { Title, Text } = Typography;
const { Content } = Layout;

function NewsCovid() {
  const [country, setCountry] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    service.getAPICovidCountry().then((res) => {
      const country = sortBy(res.data, "Country");
      setCountry(country);
      setSelectedCountryId("vn");
    });
  }, []);

  const handleOnchange = (e) => {
    setSelectedCountryId(e);
  };

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = country.find(
        (c) => c.ISO2.toLowerCase() === selectedCountryId,
      );
      service.getAPIReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [selectedCountryId, country]);

  return (
    <Layout>
      <Content style={{ padding: "20px 50px" }}>
        <Title strong level={5}>
          Tin tức COVID-19
        </Title>
        <Text>{moment().format()}</Text>
        <CountrySelector
          countries={country}
          handleOnchange={handleOnchange}
          value={selectedCountryId}
        />
        <Highlight report={report} />
        <Summary report={report} selectedCountryId={selectedCountryId} />
      </Content>
    </Layout>
  );
}

export default NewsCovid;
