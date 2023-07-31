import React from "react";
import { injectIntl } from "react-intl";
import RelatedCooperationRuleContainer from "./RelatedCooperationRuleContainer";
const CampaignRelatedCooperationRuleView = (props) => {
  const { onChange, relatedCooperation, structureInformation, error } = props;
  return (
    <>
      <RelatedCooperationRuleContainer
        error={error}
        relatedCooperation={relatedCooperation}
        onChange={onChange}
        structureInformation={structureInformation}
      />
    </>
  );
};

export default injectIntl(CampaignRelatedCooperationRuleView);
