import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import ParameterValue from "../../../../components/business-component/ParameterValue";
import RuleParameterOperator from "../../../../components/business-component/RuleParameterOperator";
import Select from "../../../../components/base-component/Select";
import RuleParameterDeleteButton from "../../../../components/business-component/RuleParameterDeleteButton";
import CampaignStructureAttributeSelect from "../../../../components/business-component/CampaignStructureAttributeSelect";
import AttributeSelect from "../../../../components/business-component/AttributeSelect";
import RuleSelect from "../../../../components/business-component/RuleSelect";
import RuleParameterContainer from "../ruledefinition/RuleParameterContainer";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import { Fab, Tooltip } from "@material-ui/core";
import AddCircle from "@material-ui/icons/AddCircle";

const RuleParameterView = (props) => {
  const {
    intl,
    activeSubMenu,
    onChange,
    handleDeleteRuleParameter,
    parameterId,
    parameter,
    index,
    variant,
    type,
    campaignTypeId,
    ruleParameters,
    errors,
    handleAddRuleParameter,
  } = props;
  const [selectedParameter, setSelectedParameter] = useState({});
  const ruleParameterTypes = [
    {
      label: "Kural",
      value: "RULE",
    },
    {
      label: "Parametre",
      value: "PARAMETER",
    },
  ];

  useEffect(() => {
    //onAreaChange({ id: "operator", value: undefined });
    //onAreaChange({ id: "value", value: undefined });
  }, [parameter.attributeId]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    parameter[id] = value;
    onChange({ id: parameterId, value: parameter, key: index, error: ObjectUtils.removeKeyFromObject(errors, id) });
  };

  return (
    <div>
      <Row className={"nopadding-margin"}>
        <Col md={2} className={"nopadding-margin"}>
          <Select
            id={"type"}
            value={parameter.type}
            onChange={onAreaChange}
            label={"Tipi"}
            error={errors && errors.type}
            options={ruleParameterTypes}
          />
        </Col>
        <Col md={8} className={"nopadding-margin"}>
          {type === "rule" &&
            {
              RULE: (
                <Col md={4} className={"nopadding-margin"}>
                  <RuleSelect
                    value={parameter.attributeId}
                    onChange={onAreaChange}
                    error={errors && errors.attributeId}
                  />
                </Col>
              ),
              PARAMETER: (
                <Row>
                  <Col md={4} className={"nopadding-margin"}>
                    <AttributeSelect
                      setSelectedParameter={setSelectedParameter}
                      campaignTypeId={campaignTypeId}
                      value={parameter.attributeId}
                      error={errors && errors.attributeId}
                      onChange={onAreaChange}
                    />
                  </Col>
                  <Col md={3} className={"nopadding-margin"}>
                    {parameter.attributeId && (
                      <RuleParameterOperator
                        value={parameter.operator}
                        onChange={onAreaChange}
                        error={errors && errors.operator}
                        parameterId={parameter.attributeId}
                      />
                    )}
                  </Col>
                  <Col md={5} className={"nopadding-margin"}>
                    {parameter.attributeId && parameter.operator && (
                      <ParameterValue
                        selectedParameter={selectedParameter}
                        value={parameter.value}
                        onChange={onAreaChange}
                        parameterId={parameter.attributeId}
                        operator={parameter.operator}
                        error={errors && errors.value}
                        type={type}
                      />
                    )}
                  </Col>
                </Row>
              ),
            }[parameter.type]
          }
        </Col>
        <Col md={1}>
          {(index !== 0 || ruleParameters.length > 1) &&
            <RuleParameterDeleteButton
              onClick={() => handleDeleteRuleParameter(parameterId)}
              variant={variant}
            >
              Parametreyi Sil
            </RuleParameterDeleteButton>
          }
        </Col>
        <Col md={1}>
          {ruleParameters && ruleParameters.length - 1 === index &&
            parameter.attributeId &&
            <Tooltip title={"Yeni Parametre Ekle"} placement="top-start">
              <Fab
                size="small"
                color={"primary"}
                aria-label="Add"
                onClick={() => handleAddRuleParameter()}
              >
                <AddCircle />
              </Fab>
            </Tooltip>
          }
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(RuleParameterView);
