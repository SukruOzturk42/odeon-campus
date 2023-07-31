import React from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import { Input } from "../../../../components/base-component/Input";
import { DatePicker } from "../../../../components/base-component/DatePicker";
import Select from "../../../../components/base-component/Select";
import { Row, Col, Container } from "react-bootstrap";

const CampaignRuleView = (props) => {
  const { intl, activeSubMenu } = props;
  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <Input id="campaignId" name="campaignId" label={"Koşul"} md={5} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(CampaignRuleView);
