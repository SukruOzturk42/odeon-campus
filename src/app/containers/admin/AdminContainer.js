import React, { useState, useEffect, useContext } from "react";
import AdminView from "./AdminView";
import { cmSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import { PageContentArea } from "../../components/base-component/PageContentArea";

export default function AdminContainer() {
  const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

  const getComponent = () => {
    const subMenu = cmSubMenuRoutes[activeSubMenu.menuRoute];
    return subMenu !== undefined
      ? subMenu
      : cmSubMenuRoutes["admin-sub-menu-define-parameter"];
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