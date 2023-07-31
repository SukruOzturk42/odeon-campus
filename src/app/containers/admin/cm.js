import ParameterDefinitionContainer from "./area/parameterdefinition/ParameterDefinitionContainer";
import MessageManagementContainer from "./area/messagemanagement/MessageManagementContainer";
import ParameterDefinitionDetailContainer from "./area/parameterdefinition/ParameterDefinitionDetailContainer";
import CampaignParameterDefinitionContainer from "./area/campaignparameterdefinition/CampaignParameterDefinitionContainer";

export const cmSubMenuRoutes = {
  "admin-sub-menu-define-parameter": ParameterDefinitionContainer,
  "admin-sub-menu-message-management": MessageManagementContainer,
  "admin-sub-menu-paramater-detail": ParameterDefinitionDetailContainer,
  "admin-sub-menu-define-campaign-parameter": CampaignParameterDefinitionContainer,
};

export const subMenus = [
  {
    title: "Parametre Tanımlama",
    component: "test",
    name: "Parametre Tanımlama",
    menuRoute: "admin-sub-menu-define-parameter",
  },
  {
    title: "Mesaj Yönetimi",
    component: "test",
    name: "Mesaj Yönetimi",
    menuRoute: "admin-sub-menu-message-management",
  },
  {
    title: "Kampanya Parametre Tanımlama",
    component: "test",
    name: "Kampanya Parametre Tanımlama",
    menuRoute: "admin-sub-menu-define-campaign-parameter",
  },
];
