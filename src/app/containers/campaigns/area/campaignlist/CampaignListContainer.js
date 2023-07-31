import React, { useState, useEffect, useContext } from "react";
import CampaignListView from "./CampaignListView";
import { GlobalContext } from "../../../../context/GlobalState";
import * as CampaignService from "../../../../services/campaignService";

export default function CampaignListContainer() {
  const { activeSubMenu } = useContext(GlobalContext);
  const [selectedCriteria, setSelectedCriteria] = useState({campaignSearchStatusEnum: "Aktif Kampanyalar", campaignTypeId:""});
  const [campaigns, setCampaigns] = useState([]);
  const [ruleGroupNames, setRuleGroupNames] = useState([]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    if(event.value === null){
      if(event.id === "campaignTypeId"){
        setSelectedCriteria({...selectedCriteria,campaignTypeId: ""})
      }else{
        setSelectedCriteria({...selectedCriteria,campaignSearchStatusEnum: ""})
      }

    }else{
      setSelectedCriteria((state) => ({ ...state, [id]: value }));
    }
  };

  useEffect(() => {
    CampaignService.filteredCampaignList(selectedCriteria).then(response => {
      response && response.data && setCampaigns(response.data.items);
    })
  }, [selectedCriteria]);

  const getRuleGroupNamesByCampaignId = (id) => {
    CampaignService.getRuleGroupNamesByCustomerCampaignId(id).then(response => {
      response && setRuleGroupNames(response);
    })
  }

  const exportCampaign = () => {
    CampaignService.exportCustomerCampaigns(selectedCriteria).then(response => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" });
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "campuscampaigns.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  return (
    <div>
      <CampaignListView
        activeSubMenu={activeSubMenu}
        selectedCriteria={selectedCriteria}
        onAreaChange={onAreaChange}
        campaigns={campaigns}
        exportCampaign={exportCampaign}
        getRuleGroupNamesByCampaignId={getRuleGroupNamesByCampaignId}
        ruleGroupNames={ruleGroupNames}
      />
    </div>
  );
}
