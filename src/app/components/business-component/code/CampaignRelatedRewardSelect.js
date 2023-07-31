import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CampaignRelatedRewardSelect = (props) => {
  const { onChange, value, md, error, campaignId, isDisabled } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    if (campaignId !== null && campaignId !== undefined) {
      ReferenceDataService.getCampaignRewardTypes(campaignId).then(response => {
        response && response.data && setData(
          response.data.items.map(item => {
            return { label: item.name, value: item.id };
          }))
      });
    }
  }, [campaignId]);

  return (
    <Select
      id="campaignRuleGroupId"
      name="campaignRuleGroupId"
      label={"Kampanya Durumları"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
      isDisabled={isDisabled}
    />
  );
};
export default CampaignRelatedRewardSelect;
