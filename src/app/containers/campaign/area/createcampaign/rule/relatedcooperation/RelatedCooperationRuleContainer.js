import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import { getUid } from "../../../../../../common/utils/Util";
import RelatedCooperationRuleView from "./RelatedCooperationRuleView";
import { GlobalContext } from "../../../../../../context/GlobalState";
import ConjunctionOperator from "../../../../../../components/business-component/ConjunctionOperator";
import { Col, Row } from "react-bootstrap";
import { PageContentArea } from "../../../../../../components/base-component/PageContentArea";

const CampaignRelatedCooperationRuleContainer = (props) => {
  const { relatedCooperation, onChange, structureInformation, error } = props;
  const { campaign } = useContext(GlobalContext);

  const [ruleParameters, setRuleParameters] = useState(
    relatedCooperation.attributes
      ? relatedCooperation.attributes
      : [{ id: getUid(), type: "PARAMETER" }]
  );

  useEffect(() => {}, [error]);
  useEffect(() => {
    onChange({
      id: "attributes",
      value: ruleParameters,
    });
  }, [ruleParameters]);

  const onAreaChange = (event) => {
    const { value, key } = event;
    let newRuleParameters = [...ruleParameters];
    newRuleParameters[key] = value;
    setRuleParameters(newRuleParameters);
  };
  const handleAddRuleParameter = () => {
    setRuleParameters((ruleParameters) => [
      ...ruleParameters,
      { id: getUid(), type: "PARAMETER" },
    ]);
  };

  const handleDeleteRuleParameter = (id) => {
    setRuleParameters(ruleParameters.filter((item) => item.id !== id));
  };

  return (
    <div>
      <PageContentArea
        title={"Parametre Tanımla"}
        error={error && error.relatedCooperation}
      >
        <Row>
          <Col md={6}>
            <ConjunctionOperator
              md={4}
              onChange={onChange}
              value={
                relatedCooperation && relatedCooperation.conjunctionOperator
              }
              error={error && error.conjunctionOperator}
            />
          </Col>
        </Row>
        {ruleParameters &&
          ruleParameters.map((item, index) => {
            return (
              <>
                <RelatedCooperationRuleView
                  error={error && error.attributes && error.attributes[index]}
                  handleAddRuleParameter={handleAddRuleParameter}
                  handleDeleteRuleParameter={handleDeleteRuleParameter}
                  parameter={item}
                  index={index}
                  onChange={onAreaChange}
                  type={"campaign"}
                  structureInformation={structureInformation}
                  campaign={campaign}
                  ruleParameters={ruleParameters}
                />
              </>
            );
          })}
      </PageContentArea>
    </div>
  );
};

export default injectIntl(CampaignRelatedCooperationRuleContainer);
