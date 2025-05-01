import React from "react";
import { Tabs, Tab,Row,Col } from "react-bootstrap";
import OverviewTab from "./OverviewTab";
import EconomyTab from "./EconomyTab";
import MapsTab from "./MapsTab";

const CountryTabs = ({ country, themeMode }) => {
  return (
    <Row className="mb-5">
      <Col>
        <Tabs defaultActiveKey="overview" id="country-tabs" className="mb-4">
          <Tab eventKey="overview" title="Overview">
            <OverviewTab country={country} themeMode={themeMode} />
          </Tab>
          <Tab eventKey="economy" title="Economy">
            <EconomyTab country={country} themeMode={themeMode} />
          </Tab>
          <Tab eventKey="maps" title="Maps">
            <MapsTab country={country} themeMode={themeMode} />
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
};

export default CountryTabs;