import ParticipantDashBoardContainer from "./area/participantdashboard/ParticipantDashboardContainer"
import SaleDashBoardContainer from "./area/saledashboard/SaleDashBoardContainer"
import DashBoardDetailContainer from "./area/DashBoardDetailContainer"
export const cmSubMenuRoutes = {
  "cm-sub-menu-participant-dashboard": ParticipantDashBoardContainer,
  "cm-sub-menu-sale-dashboard": SaleDashBoardContainer,
  "cm-sub-menu-reward-detail": DashBoardDetailContainer,
};

export const subMenus = [
  {
    title: "Satış Kampanyaları",
    component: "test",
    name: "Satış Kampanyaları",
    menuRoute: "cm-sub-menu-sale-dashboard",
  },
  // {
  //   title: "Katılım Kampanyaları",
  //   component: "test",
  //   name: "Katılım Kampanyaları",
  //   menuRoute: "cm-sub-menu-participant-dashboard",
  // },

];
