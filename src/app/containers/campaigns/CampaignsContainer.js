import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { campaignsSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import { PageContentArea } from "../../components/base-component/PageContentArea";
import { getInitialRule } from "../../common/utils/Util";
import { hasUserAuthorization } from "../../services/TokenService";

export default function CampaignsContainer() {
  const { activeSubMenu, setCampaign } = useContext(GlobalContext);
  const history = useHistory();

  const getComponent = () => {
    const subMenu = campaignsSubMenuRoutes[activeSubMenu.menuRoute];
    return subMenu !== undefined
      ? subMenu
      : campaignsSubMenuRoutes["campaigns-sub-menu-campaign-list"];
  };
  let ContentComponent = getComponent();

  return (
    ContentComponent && (
      <div>
        <PageContentArea
          title={activeSubMenu.title}
          buttonText={hasUserAuthorization() ? "Yeni Kampanya Tanımla" : null}
          buttonOnClick={() => {
            setCampaign({
              campaignInformation: {},
              campaignRuleGroups: [getInitialRule()],
            });
            history.push("/cm-campaign");
          }}
        >
          <ContentComponent activeSubMenu={activeSubMenu} />
        </PageContentArea>
      </div>
    )
  );
}
