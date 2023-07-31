import React, { useState, useEffect, useContext } from "react";
import RuleView from "./RuleView";
import { ruleSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import { PageContentArea } from "../../components/base-component/PageContentArea";

export default function RuleContainer() {
    const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

    const getComponent = () => {
        return ruleSubMenuRoutes["rule-sub-menu-rule-definition"];
    };
    let ContentComponent = getComponent();

    return (
        ContentComponent && (
            <div>
                <PageContentArea title={activeSubMenu.title}>
                    <ContentComponent activeSubMenu={activeSubMenu} />
                </PageContentArea>
            </div>
        )
    );
}