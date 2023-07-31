import React, { useState, useEffect, useContext } from "react";
import ParticipantDashboardView from "./ParticipantDashboardView";
import { GlobalContext } from "../../../../context/GlobalState";
import * as CampaignService from "../../../../services/campaignService";

export default function ParticipantDashboardContainer() {
    const { activeSubMenu,setActiveSubMenu } = useContext(GlobalContext);
    const [selectedCriteria, setSelectedCriteria] =
        useState({approvalCampaignSearchStatusEnum: "İşlem Bekleyen Kampanyalar", campaignTypeId:""});
    const [campaigns, setCampaigns] = useState([]);

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


    return (
        <div>
            <ParticipantDashboardView
                activeSubMenu={activeSubMenu}
                selectedCriteria={selectedCriteria}
                onAreaChange={onAreaChange}
                campaigns={campaigns}
            />
        </div>
    );
}
