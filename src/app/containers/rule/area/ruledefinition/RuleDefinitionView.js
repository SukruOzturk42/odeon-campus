import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import RuleDeleteButton from "../../../../components/business-component/RuleDeleteButton";
import { Input } from "../../../../components/base-component/Input";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import Select from "../../../../components/base-component/Select";
import RuleParameterContainer from "./RuleParameterContainer";
import RuleCampaignTypeSelect from "../../../../components/business-component/RuleCampaignTypeSelect";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import _ from "lodash";


const RuleDefinitionView = (props) => {
  const {
    intl,
    activeSubMenu,
    rule,
    ruleId,
    onChange,
    handleDeleteRule,
    index,
    errors,
  } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedCampaignType, setSelectedCampaignType] = useState();
  const [campaignTypeError, setCampaignTypeError] = useState();

  const controls = [
    {
      label: "AND",
      value: "AND",
    },
    {
      label: "OR",
      value: "OR",
    },
  ];

  useEffect(() => {
    setCampaignTypeError(undefined);
  }, [rule.campaignTypeId]);

  const onHandleCampanyTypeChange = (event) => {
    setShowModal(true);
    setSelectedCampaignType(event);
  };

  const onHandleModalOnOk = () => {
    const { value, id, relatedProps } = selectedCampaignType;
    onAreaChange({id: id, value: value, relatedProps: relatedProps});
  };

  const onAreaChange = (event) => {
    const { id, value, relatedProps } = event;
    rule[id] = value;
    onChange({ 
      id: ruleId, 
      value: _.omit(rule, relatedProps), 
      key: index, 
      error: ObjectUtils.removeKeyFromObject(errors, id) });
  };

  return (
    <div>
      <Row>
        <Col md={4}>
          <Input
            id={"ruleName"}
            onChange={onAreaChange}
            value={rule.ruleName ? rule.ruleName : undefined}
            label={"Kural İsmi"}
            error={errors && errors.ruleName}
          />
        </Col>
        <Col md={3}>
          <RuleCampaignTypeSelect
            id={"campaignTypeId"}
            onChange={
              rule.campaignTypeId
                ? onHandleCampanyTypeChange
                : onAreaChange
            }
            value={rule.campaignTypeId}
            label={"Kampanya Tipi"}
            error={(errors && errors.campaignTypeId) || campaignTypeError}
          />
        </Col>
        <Col md={2}>
          <Select
            id={"conjunctionOperator"}
            onChange={onAreaChange}
            value={rule.conjunctionOperator}
            label={"Kontrol"}
            options={controls}
            error={errors && errors.conjunctionOperator}
          />
        </Col>
        <Col>
          <RuleDeleteButton md={3} onClick={() => handleDeleteRule(ruleId)}>
            Kural Sil
          </RuleDeleteButton>
        </Col>
      </Row>
      <Row>
        <Col>
          <RuleParameterContainer
            attributes={rule.attributes}
            campaignTypeId={rule.campaignTypeId}
            onChange={onAreaChange}
            setCampaignTypeError={setCampaignTypeError}
            errors={errors}
            ruleKey={index}
            type="rule"
          />
        </Col>
      </Row>
      <ConfirmModal
        show={showModal}
        setShow={setShowModal}
        title={"Kampanya Tipi Degişikligi"}
        bodyMessage={"Parametre ekranında girilen bilgiler sıfırlanacaktır"}
        onOk={onHandleModalOnOk}
      />
    </div>
  );
};

export default injectIntl(RuleDefinitionView);
