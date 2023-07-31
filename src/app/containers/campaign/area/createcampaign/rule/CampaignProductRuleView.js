import React from "react";
import { injectIntl } from "react-intl";
import { Input } from "../../../../../components/base-component/Input";
import ConjunctionOperator from "../../../../../components/business-component/ConjunctionOperator";
import RuleDeleteButton from "../../../../../components/business-component/RuleDeleteButton";
import { Row, Col, Container } from "react-bootstrap";
import CampaignRuleParameterContainer from "../rule/CampaignRuleParameterContainer";
import { PageContentErrorArea } from "../../../../../components/base-component/PageContentErrorArea";
import ContactGroupSelect from "../../../../../components/business-component/ContactGroupSelect";

const CampaignProductRuleView = (props) => {
  const {
    intl,
    activeSubMenu,
    key,
    rule,
    onChange,
    handleDeleteRule,
    structureInformation,
    error,
  } = props;
  return (
    <div>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <Input
                id="name"
                name="name"
                label={"Koşul"}
                value={rule.name}
                onChange={onChange}
                error={error && error.name}
              />
            </Col>

            <Col md={3}>
              <ConjunctionOperator
                onChange={onChange}
                value={rule.conjunctionOperator}
              />
            </Col>
            <Col md={3}>
              <RuleDeleteButton
                md={3}
                onClick={() => handleDeleteRule(rule.id)}
                variant={"secondary"}
              >
                Durum Sil
              </RuleDeleteButton>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <PageContentErrorArea
                error={
                  (!rule.attributes || rule.attributes.length <= 0) && error
                    ? error.attribute
                    : ""
                }
              >
                <CampaignRuleParameterContainer
                  error={error && error.attributes}
                  attributes={rule.attributes}
                  onChange={onChange}
                  ruleKey={key}
                  title={"Kampanya Parametreleri"}
                  type="campaign"
                  structureInformation={structureInformation}
                />
              </PageContentErrorArea>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default injectIntl(CampaignProductRuleView);
