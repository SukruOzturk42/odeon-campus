import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Col, Row } from "react-bootstrap";
import ParameterValue from "../../../../../../components/business-component/ParameterValue";
import ParameterOperator from "../../../../../../components/business-component/ParameterOperator";
import RuleParameterDeleteButton from "../../../../../../components/business-component/RuleParameterDeleteButton";
import OwnerProductAttributeSelect from "../../../../../../components/business-component/OwnerProductAttributeSelect";
import * as ObjectUtils from "../../../../../../common/utils/ObjectUtils";

import _ from "lodash";
import {Fab, Tooltip} from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";

const OwnerProductRuleView = (props) => {
  const {
    onChange,
    parameter,
    type,
    variant,
    handleDeleteRuleParameter,
    structureInformation,
    campaign,
    index,
    error,
  } = props;

  const [errors, setErrors] = useState({});

  const [selectedParameter, setSelectedParameter] = useState({});
  useEffect(() => {
    setErrors(error);
  }, [error]);

  const onAreaChange = (event) => {
    const { id, value, relatedProps } = event;
    parameter["type"] = "PARAMETER";
    parameter[id] = value;
    onChange({
      key: index,
      value: _.omit(parameter, relatedProps),
    });
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };
  return (
    <>
      <Row>
        <Col md={3}>
          <OwnerProductAttributeSelect
            value={parameter.attributeId}
            onChange={onAreaChange}
            campaignStructureId={structureInformation.id}
            campaignTypeId={campaign.campaignInformation.campaignTypeId}
            attributeType={1}
            error={errors && errors.attributeId}
            setSelectedParameter={setSelectedParameter}
            ruleParameters={props.ruleParameters}
          />
        </Col>
        <Col md={3}>
          {parameter.attributeId && (
            <ParameterOperator
              value={parameter.operator}
              onChange={onAreaChange}
              parameterId={parameter.attributeId}
              error={errors && errors.operator}
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
              error={errors && errors.value}
              selectedParameter={selectedParameter}
            />
          )}
        </Col>
        <Col md={1}>
          {(index !== 0 ||
              props.ruleParameters.length > 1) && (
            <RuleParameterDeleteButton
              onClick={() => handleDeleteRuleParameter(parameter.id)}
              variant={variant}
            >
              Parametreyi Sil
            </RuleParameterDeleteButton>
          )}
        </Col>
        <Col md={1} className={"nopadding-margin"}>
          {props.ruleParameters &&
          props.ruleParameters.length - 1 === index &&
          parameter.attributeId && (
              <Tooltip title={"Yeni parametre Ekle"} placement="top-start">
                <Fab
                    size="small"
                    color={"primary"}
                    aria-label="Add"
                    onClick={() => props.handleAddRuleParameter()}
                >
                  <AddCircle />
                </Fab>
              </Tooltip>
          )}
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(OwnerProductRuleView);
