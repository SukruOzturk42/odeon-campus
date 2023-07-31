import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { injectIntl } from "react-intl";
import SubProductRuleContainer from "./SubProductRuleContainer";

const CampaignSubProductRuleView = (props) => {
  const { onChange, subProduct, parameter, type } = props;
  return (
    <>
      <Row>
        <Col md={12}>
          <SubProductRuleContainer
            onChange={onChange}
            subProduct={subProduct}
            parentParameter={parameter}
            type={type}
          />
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(CampaignSubProductRuleView);
