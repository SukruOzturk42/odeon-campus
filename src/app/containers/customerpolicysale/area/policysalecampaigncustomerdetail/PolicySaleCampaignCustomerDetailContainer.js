import React, { useState, useEffect, useContext } from "react";
import {GlobalContext} from "../../../../context/GlobalState";
import PolicySaleCampaignCustomerDetailView from "./PolicySaleCampaignCustomerDetailView";
import PolicySaleRewardCampaignService, {getPolicySaleCampaignDetail} from "../../../../services/PolicySaleRewardCampaignService"
export default function PolicySaleCampaignCustomerDetailContainer() {
    const { activeSubMenu } = useContext(GlobalContext);
    const [policySaleRewardCampaigns,setPolicySaleRewardCampaigns] = useState([])
    const [campaignDetail,setCampaignDetail] = useState({})

    useEffect(() => {
        getPolicySaleRewardCampaigns();
    },[])

    useEffect(() => {
        getPolicySaleCampaignDetail(activeSubMenu.campaignId)
            .then((response) => {
                setCampaignDetail(response.data);
            })
    },[])

    const getPolicySaleRewardCampaigns = () => {
        PolicySaleRewardCampaignService.getPolicySaleCampaignCustomerList(activeSubMenu.campaignId)
            .then((response) => {
                setPolicySaleRewardCampaigns(response.data.items)
            })

    }

    return (
       <>
           <PolicySaleCampaignCustomerDetailView
               policySaleRewardCampaigns={policySaleRewardCampaigns}
               campaignDetail={campaignDetail}
           />
       </>
    );
}
