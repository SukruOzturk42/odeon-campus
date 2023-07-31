import CampaignRewardContainer from "../campaign/area/createcampaign/reward/CampaignRewardContainer";
import CampaignProductContainer from "../campaign/area/createcampaign/CampaignProductContainer";
import CampaignOwnerProductRuleContainer from "../campaign/area/createcampaign/rule/ownerproduct/CampaignOwnerProductRuleContainer";
import CampaignContactGroupContainer from "../campaign/area/createcampaign/rule/contactgroup/CampaignContactGroupContainer";
import SaleTaskGroupContainer from "../campaign/area/createcampaign/rule/saletaskgroup/SaleTaskGroupContainer";
import CampaignRelatedCooperationRuleContainer from "../campaign/area/createcampaign/rule/relatedcooperation/CampaignRelatedCooperationRuleContainer";
import CampaignContactProductRuleContainer from "../campaign/area/createcampaign/rule/contactproduct/CampaignContactProductRuleContainer";
import CampaignSubProductRuleContainer from "../campaign/area/createcampaign/rule/subproduct/CampaignSubProductRuleContainer";

export const companyCampaignAreas = {
  "as-company-rule-product": CampaignProductContainer,
  "as-company-rule-sub-product": CampaignSubProductRuleContainer,
  "as-company-rule-owner-product": CampaignOwnerProductRuleContainer,
  "as-company-rule-contact-group": CampaignContactGroupContainer,
  "as-company-rule-sale-task-group": SaleTaskGroupContainer,
  "as-company-rule-related-cooperation": CampaignRelatedCooperationRuleContainer,
  "as-company-rule-contact-product": CampaignContactProductRuleContainer,
  "as-company-rule-reward": CampaignRewardContainer,
};
