import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_metronic/_partials/controls";

export default function CampaignShortInfoContainer() {
    const { activeSubMenu, campaign } = useContext(GlobalContext);

    return (
        campaign.id ? <Card>
            <CardHeader title={"Kampanya ID: " + campaign.id + " - Kampanya İsmi: " + campaign.campaignInformation.campaignName} />
        </Card> : <></>
    )
}