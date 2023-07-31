import React, { useState, useEffect, useContext } from "react";
import { injectIntl } from "react-intl";
import CampaignRuleView from "./CampaignProductRuleView";
import { companyCampaignAreas } from "../../../../company/cm";
import { getEmptyObjectHasId, getUid } from "../../../../../common/utils/Util";
import { GlobalContext } from "../../../../../context/GlobalState";
import * as ObjectUtils from "../../../../../common/utils/ObjectUtils";

const CampaignProductRuleContainer = (props) => {
  const {
    intl,
    activeSubMenu,
    rule,
    onChange,
    handleDeleteRule,
    id,
    structureInformation,
    index,
    error,
  } = props;
  const [productRule, setProductRule] = useState(rule);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProductRule(rule);
  }, [rule]);

  useEffect(() => {
    setErrors(error);
  }, [error]);

  const onAreaChange = (event) => {
    const { value, id } = event;
    productRule[id] = value;
    setProductRule(productRule);
    onChange({ key: index, id: id, value: productRule });
    setErrors(ObjectUtils.removeKeyFromObject(errors, id));
  };

  const onChildAreaChange = (event) => {
    console.log(event);
    const { value, key } = event;
    productRule["children"][key] = value;
    setProductRule(productRule);
    onChange({ key: index, id: id, value: productRule });
  };
  const getComponent = (route) => {
    const subMenuItem = companyCampaignAreas[route];
    return subMenuItem !== undefined
      ? subMenuItem
      : companyCampaignAreas["as-company-rule-product"];
  };

  return (
    <div>
      <CampaignRuleView
        error={errors}
        key={index}
        activeSubMenu={activeSubMenu}
        onChange={onAreaChange}
        rule={productRule}
        handleDeleteRule={handleDeleteRule}
        structureInformation={structureInformation}
      />
      <div>
        {structureInformation.children &&
          structureInformation.children.map((item, index) => {
            let ContentComponent = getComponent(item.route);
            return (
              <ContentComponent
                error={errors}
                structureInformation={item}
                onChange={onChildAreaChange}
                onParentAreaChange={onAreaChange}
                index={index}
                rule={rule}
              />
            );
          })}
      </div>
    </div>
  );
};

export default injectIntl(CampaignProductRuleContainer);
