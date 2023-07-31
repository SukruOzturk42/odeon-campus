import UserHomeContainer from "../containers/user/home/UserHomeContainer";
import { AsideMenuAdmin } from "../containers/admin/AsideMenuAdmin";
import { AsideMenuCampaign } from "../containers/campaign/AsideMenuCampaign";
import { AsideMenuCampaigns } from "../containers/campaigns/AsideMenuCampaigns";
import { AsideMenuRule } from "../containers/rule/AsideMenuRule";
import { AsideMenuCode } from "../containers/thirdpartycode/AsideMenuCode";
import { AsideMenuContact } from "../containers/contact/AsideMenuContact";
import { AsideMenuDashboard } from "../containers/campaigndashboard/AsideMenuDashboard";
import {AsideMenuCustomerPolicySale} from "../containers/customerpolicysale/AsideMenuCustomerPolicySale";
import { AsideMenuTaskManagement } from "../containers/taskmanagement/AsideMenuTaskManagement";

export const otmRoutes = {
  cm: UserHomeContainer,
};

export const cmMenuRoutes = {
  "cm-menu-company": AsideMenuCampaign,
  "cm-campaign-menu": AsideMenuCampaign,
  "cm-campaigns": AsideMenuCampaigns,
  "cm-rule-menu": AsideMenuRule,
  "cm-code-menu": AsideMenuCode,
  "cm-contact-menu": AsideMenuContact,
  "cm-dashboard-menu": AsideMenuDashboard,
  "cm-policy-sale-menu" : AsideMenuCustomerPolicySale,
  "cm-admin-menu": AsideMenuAdmin,
  "cm-task-management-menu": AsideMenuTaskManagement,
};
