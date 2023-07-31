import React, { useState, useEffect, useContext } from "react";
import CampaignApprovalView from "./CampaignApprovalView";
import { GlobalContext } from "../../../../context/GlobalState";
import * as CampaignService from "../../../../services/campaignService";

export default function CampaignApprovalContainer() {
  const { activeSubMenu } = useContext(GlobalContext);
  const [selectedCriteria, setSelectedCriteria] = useState({approvalCampaignSearchStatusEnum: "İşlem Bekleyen Kampanyalar", campaignTypeId:""});
  const [campaigns, setCampaigns] = useState([]);
  const [ruleGroupNames, setRuleGroupNames] = useState([]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    if(event.value === null){
      if(event.id === "campaignTypeId"){
        setSelectedCriteria({...selectedCriteria,campaignTypeId: ""})
      }else{
        setSelectedCriteria({...selectedCriteria,approvalCampaignSearchStatusEnum: ""})
      }
    }else{
      setSelectedCriteria((state) => ({ ...state, [id]: value }));
    }
  };

  useEffect(() => {
      CampaignService.filteredApprovalCampaignList(selectedCriteria).then(response => {
        response && response.data && setCampaigns(response.data.items);
      })
  }, [selectedCriteria]);

  const getRuleGroupNamesByCampaignId = (id) => {
    CampaignService.getRuleGroupNamesByCustomerCampaignId(id).then(response => {
      response && setRuleGroupNames(response);
    })
  }

  const exportCampaign = () => {
    CampaignService.exportApprovalCampaigns(selectedCriteria).then(response => {
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
      <CampaignApprovalView
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
