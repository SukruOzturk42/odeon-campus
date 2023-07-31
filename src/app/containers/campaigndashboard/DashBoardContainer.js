import React, { useState, useEffect, useContext } from "react";
import { cmSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import { PageContentArea } from "../../components/base-component/PageContentArea";
import { hasUserAuthorization } from "../../services/TokenService";

export default function DashBoardContainer() {
    const { activeSubMenu, campaign } = useContext(GlobalContext);
    const [campaignId,setCampaignId] = useState(null)
    //cm-sub-menu-reward-detail
    const getComponent = () => {
        const subMenuItem = cmSubMenuRoutes[activeSubMenu.menuRoute];
        return subMenuItem !== undefined
            ? subMenuItem
            : cmSubMenuRoutes["cm-sub-menu-sale-dashboard"];
    };
    let ContentComponent = getComponent();

    return (
        ContentComponent && (
            <div
                style={
                    hasUserAuthorization()
                        ? {}
                        : { pointerEvents: "none", opacity: "0.6" }
                }
            >

                <PageContentArea title={activeSubMenu.title}>
                    <ContentComponent activeSubMenu={activeSubMenu}
                                      campaignId={campaignId}
                                      setCampaignId={setCampaignId}/>
                </PageContentArea>
            </div>
        )
    );
}
