import React, { useState, useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import ParameterValue from "../../../../../components/business-component/ParameterValue";
import ParameterOperator from "../../../../../components/business-component/ParameterOperator";
import RuleParameterDeleteButton from "../../../../../components/business-component/RuleParameterDeleteButton";
import CampaignStructureAttributeSelect from "../../../../../components/business-component/CampaignStructureAttributeSelect";
import RuleSelect from "../../../../../components/business-component/RuleSelect";
import ParameterTypeSelect from "../../../../../components/business-component/ParameterTypeSelect";
import { GlobalContext } from "../../../../../context/GlobalState";
import CampaignSubProductRuleContainer from "./subproduct/CampaignSubProductRuleContainer";
import _ from "lodash";
import { Fab, Tooltip } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";

const CampaignRuleParameterView = (props) => {
  const {
    onChange,
    handleDeleteRuleParameter,
    parameterId,
    parameter,
    index,
    variant,
    type,
    structureInformation,
    ruleParameters,
    error,
    campaignParameters,
    setCampaignParameters,
  } = props;

  const [selectedParameter, setSelectedParameter] = useState({});
  const { campaign } = useContext(GlobalContext);

  const onAreaChange = (event) => {
    const { id, value, relatedProps } = event;
    parameter[id] = value;
    onChange({
      id: parameterId,
      value: _.omit(parameter, relatedProps),
      key: index,
    });
  };

  return (
    <div>
      <Row className={"nopadding-margin"}>
        <Col md={2} className={"nopadding-margin"}>
          <ParameterTypeSelect
            parameter={parameter}
            value={parameter.type}
            onChange={onAreaChange}
          />
        </Col>
        <Col md={8} className={"nopadding-margin"}>
          {
            {
              RULE: (
                <Col md={4} className={"nopadding-margin"}>
                  <RuleSelect
                    value={parameter.attributeId}
                    onChange={onAreaChange}
                    error={error && error.attributeId}
                    campaignTypeId={campaign.campaignInformation.campaignTypeId}
                  />
                </Col>
              ),
              PARAMETER: (
                <>
                  <Row>
                    <Col md={4} className={"nopadding-margin"}>
                      <CampaignStructureAttributeSelect
                        ruleParameters={ruleParameters}
                        setSelectedParameter={setSelectedParameter}
                        value={parameter.attributeId}
                        onChange={onAreaChange}
                        error={error && error.attributeId}
                        campaignStructureId={structureInformation.id}
                        campaignTypeId={
                          campaign.campaignInformation.campaignTypeId
                        }
                        campaignParameters={campaignParameters}
                        setCampaignParameters={setCampaignParameters}
                        attributeType={1}
                      />
                    </Col>
                    <Col md={3} className={"nopadding-margin"}>
                      {parameter.attributeId && (
                        <ParameterOperator
                          value={parameter.operator}
                          onChange={onAreaChange}
                          parameterId={parameter.attributeId}
                          error={error && error.operator}
                        />
                      )}
                    </Col>
                    <Col md={4} className={"nopadding-margin"}>
                      {parameter.attributeId && parameter.operator && (
                        <ParameterValue
                          value={parameter.value}
                          onChange={onAreaChange}
                          parameterId={parameter.attributeId}
                          selectedParameter={selectedParameter}
                          operator={parameter.operator}
                          type={type}
                          error={error && error.value}
                        />
                      )}
                    </Col>
                  </Row>
                </>
              ),
            }[parameter.type ? parameter.type : "PARAMETER"]
          }
        </Col>
        <Col md={1} className={"nopadding-margin"}>
          {(index !== 0 || props.ruleParameters.length > 1) && (
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
            parameter.type === "PARAMETER" &&
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
          {props.ruleParameters &&
            props.ruleParameters.length - 1 === index &&
            parameter.type === "RULE" && (
              <Tooltip title={"Yeni kural Ekle"} placement="top-start">
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
    </div>
  );
};

export default injectIntl(CampaignRuleParameterView);
