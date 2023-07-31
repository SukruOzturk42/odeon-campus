import CampaignBudgetContainer from "./area/campaignbudget/CampaignBudgetContainer";
import CampaignCodeContainer from "../thirdpartycode/area/campaigncode/CampaignCodeContainer";
import CampaignDetailContainer from "./area/campaigndetail/CampaignDetailContainer";
import CampaignGoalContainer from "./area/campaigngoal/CampaignGoalContainer";
import CampaignReasonContainer from "./area/campaignreason/CampaignReasonContainer";
import CreateCampaignContainer from "./area/createcampaign/CreateCampaignContainer";
import CampaignCustomerContainer from "../contact/area/campaigncustomer/CampaignCustomerContainer";

export const cmSubMenuRoutes = {
  "cm-sub-menu-create-campaign": CreateCampaignContainer,
  "cm-sub-menu-campaign-budget": CampaignBudgetContainer,
  "cm-sub-menu-campaign-goal": CampaignGoalContainer,
  "cm-sub-menu-campaign-detail": CampaignDetailContainer,
  "cm-sub-menu-campaign-reason": CampaignReasonContainer,
  "cm-sub-menu-campaign-customer": CampaignCustomerContainer,
};

export const subMenus = [
  {
    title: "Kampanya Özet Bilgileri",
    component: "test",
    name: "Kampanya Özet Bilgileri",
    menuRoute: "cm-sub-menu-create-campaign",
  },
  {
    title: "Bütçe",
    component: "test",
    name: "Bütçe",
    menuRoute: "cm-sub-menu-campaign-budget",
  },
  {
    title: "Hedef",
    component: "test",
    name: "Hedef",
    menuRoute: "cm-sub-menu-campaign-goal",
  },
  {
    title: "Metin ve Görsel",
    component: "test",
    name: "Metin ve Görsel",
    menuRoute: "cm-sub-menu-campaign-detail",
  },
  {
    title: "Kampanya Sebebi",
    component: "test",
    name: "Kampanya Sebebi",
    menuRoute: "cm-sub-menu-campaign-reason",
  },
];
