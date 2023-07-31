import React, { useState, useEffect, useContext } from "react";
import { taskManagementSubMenuRoutes } from "./cm";
import { GlobalContext } from "../../context/GlobalState";
import { PageContentArea } from "../../components/base-component/PageContentArea";

export default function TaskManagementContainer() {
  const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

  const getComponent = () => {
    const subMenu = taskManagementSubMenuRoutes[activeSubMenu.menuRoute];
    return subMenu !== undefined
      ? subMenu
      : taskManagementSubMenuRoutes[
          "task-management-sub-menu-task-list-definition"
        ];
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
