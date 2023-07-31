import React from "react";
import { injectIntl } from "react-intl";
import OwnerProductRuleContainer from "./OwnerProductRuleContainer";
const CampaignOwnerProductRuleView = (props) => {
  const { onChange, ownerProduct, structureInformation, error } = props;
  return (
    <>
      <OwnerProductRuleContainer
        error={error}
        ownerProduct={ownerProduct}
        onChange={onChange}
        structureInformation={structureInformation}
      />
    </>
  );
};

export default injectIntl(CampaignOwnerProductRuleView);
