import React from "react";
import { injectIntl } from "react-intl";
import ContactProductRuleContainer from "./ContactProductRuleContainer";
const CampaignContactProductRuleView = (props) => {
  const { onChange, contactProduct, structureInformation, error } = props;
  return (
    <>
      <ContactProductRuleContainer
        error={error}
        contactProduct={contactProduct}
        onChange={onChange}
        structureInformation={structureInformation}
      />
    </>
  );
};

export default injectIntl(CampaignContactProductRuleView);
