import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import ParameterValue from "../../../../../../components/business-component/ParameterValue";
import ParameterOperator from "../../../../../../components/business-component/ParameterOperator";
import RuleParameterDeleteButton from "../../../../../../components/business-component/RuleParameterDeleteButton";
import SubProductAttributeSelect from "../../../../../../components/business-component/SubProductAttributeSelect";
import _ from "lodash";
const SubProductRuleView = (props) => {
  const {
    variant,
    onChange,
    type,
    parameter,
    handleDeleteRuleParameter,
    index,
    parentParameter,
  } = props;

  const onAreaChange = (event) => {
    const { id, value, relatedProps } = event;
    parameter["type"] = "PARAMETER";
    parameter[id] = value;
    onChange({
      key: index,
      value: _.omit(parameter, relatedProps),
    });
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <SubProductAttributeSelect
            value={parameter.attributeId}
            onChange={onAreaChange}
            parentParameterId={parentParameter.attributeId}
          />
        </Col>
        <Col md={4}>
          {parameter.attributeId && (
            <ParameterOperator
              value={parameter.operator}
              onChange={onAreaChange}
              parameterId={parameter.attributeId}
            />
          )}
        </Col>
        <Col md={4}>
          {parameter.attributeId && parameter.operator && (
            <ParameterValue
              value={parameter.value}
              onChange={onAreaChange}
              parameterId={parameter.attributeId}
              operator={parameter.operator}
              type={type}
            />
          )}
        </Col>
        <Col md={1}>
          {index !== 0 && (
            <RuleParameterDeleteButton
              onClick={() => handleDeleteRuleParameter(parameter.id)}
              variant={variant}
            >
              Parametreyi Sil
            </RuleParameterDeleteButton>
          )}
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(SubProductRuleView);
