import React, { useState, useEffect, useContext } from "react";
import CodeView from "./CodeView";
import { codeSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import { PageContentArea } from "../../components/base-component/PageContentArea";

export default function CodeContainer() {
  const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

  const getComponent = () => {
    const subMenu = codeSubMenuRoutes[activeSubMenu.menuRoute];
    return subMenu !== undefined
      ? subMenu
      : codeSubMenuRoutes["code-sub-menu-campaign-code-upload"];
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