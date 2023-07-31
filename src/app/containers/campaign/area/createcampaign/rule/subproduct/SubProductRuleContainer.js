import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { PageContentArea } from "../../../../../../components/base-component/PageContentArea";
import SubProductRuleView from "./SubProductRuleView";
import { getEmptyObjectHasId } from "../../../../../../common/utils/Util";
import ConjunctionOperator from "../../../../../../components/business-component/ConjunctionOperator";
import { Col, Row } from "react-bootstrap";

const SubProductRuleContainer = (props) => {
  const { onChange, parameter, subProduct, parentParameter, type } = props;
  const [ruleParameters, setRuleParameters] = useState(
    subProduct.attributes ? subProduct.attributes : [getEmptyObjectHasId]
  );

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
      getEmptyObjectHasId(),
    ]);
  };

  const handleDeleteRuleParameter = (id) => {
    setRuleParameters(ruleParameters.filter((item) => item.id !== id));
  };

  return (
    <div>
      <PageContentArea
        title={"Teminat Koşulu Tanımla"}
        buttonText={"Parametre Ekle"}
        buttonOnClick={handleAddRuleParameter}
      >
        <Row>
          <Col md={6}>
            <ConjunctionOperator
              md={4}
              onChange={onChange}
              value={subProduct.conjunctionOperator}
            />
          </Col>
        </Row>

        {ruleParameters &&
          ruleParameters.map((item, index) => {
            return (
              <>
                <SubProductRuleView
                  handleAddRuleParameter={handleAddRuleParameter}
                  handleDeleteRuleParameter={handleDeleteRuleParameter}
                  parameter={item}
                  index={index}
                  onChange={onAreaChange}
                  ruleParameters={ruleParameters}
                  parentParameter={parentParameter}
                  type={type}
                />
              </>
            );
          })}
      </PageContentArea>
    </div>
  );
};

export default injectIntl(SubProductRuleContainer);
