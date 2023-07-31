import React, { useState, useEffect, useContext } from "react";
import CampaignView from "./CampaignView";
import { cmSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import AuthArea from "../../components/business-component/AuthArea";
import { hasUserAuthorization } from "../../services/TokenService";
import CampaignShortInfoContainer from "./area/campaignshortinfo/CampaignShortInfoContainer";

export default function CampaignContainer() {
  const { activeSubMenu, campaign } = useContext(GlobalContext);

  const getComponent = () => {
    const subMenuItem = cmSubMenuRoutes[activeSubMenu.menuRoute];
    return subMenuItem !== undefined
      ? subMenuItem
      : cmSubMenuRoutes["cm-sub-menu-create-campaign"];
  };
  let ContentComponent = getComponent();

  return (
    ContentComponent && (
      <AuthArea>
        <div
          style={
            hasUserAuthorization()
              ? {}
              : { pointerEvents: "none", opacity: "0.6" }
          }
        >
          <CampaignShortInfoContainer />
          <ContentComponent activeSubMenu={activeSubMenu} />
        </div>
      </AuthArea>
    )
  );
}
