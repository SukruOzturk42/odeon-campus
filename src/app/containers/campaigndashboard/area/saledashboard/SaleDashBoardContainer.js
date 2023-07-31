import React, { useState, useEffect, useContext } from "react";
import SaleDashboardView from "./SaleDashboardView";
import { GlobalContext } from "../../../../context/GlobalState";
import * as CampaignService from "../../../../services/campaignService";

export default function SaleDashboardContainer() {
  const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    CampaignService.getSaleCampaigns().then((response) => {
      response &&
        response.data &&
        setCampaigns((old) => [...old, ...response.data.items]);
    });
  }, []);

  return (
    <div>
      <SaleDashboardView
        activeSubMenu={activeSubMenu}
        campaigns={campaigns}
        setCampaigns={setCampaigns}
        setActiveSubMenu={setActiveSubMenu}
      />
    </div>
  );
}
