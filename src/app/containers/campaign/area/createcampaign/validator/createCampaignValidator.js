import { validate as validateCampaignIformation } from "./campaignInformationValidator";
import { validate as validateCampaignRuleGroups } from "./campaignRuleGroupValidator";

export const validate = (campaign) => {
  const errors = {};
  errors.campaignInformation = validateCampaignIformation(
    campaign.campaignInformation
  );
  errors.campaignRuleGroups = validateCampaignRuleGroups(
    campaign.campaignRuleGroups,
    campaign.campaignInformation
  );
  return errors;
};
