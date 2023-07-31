import React, { useMemo, useState } from "react";
import { useHtmlClassService } from "../../_metronic/layout/_core/MetronicLayout";
import AsideDashBoardMenuList from "./AsideDashBoardMenuList";

export function AsideMenuDashboard({ menu, handleSetComponentProperites }) {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            layoutConfig: uiService.config,
            asideMenuAttr: uiService.getAttributes("aside_menu"),
            ulClasses: uiService.getClasses("aside_menu_nav", true),
            asideClassesFromConfig: uiService.getClasses("aside_menu", true),
        };
    }, [uiService]);

    return (
        <div className={`tab-pane fade ${"show active"}`}>
            <div className="aside-menu-wrapper flex-column-fluid px-3 py-5">
                {/* begin::Menu Container */}
                <div
                    id="kt_aside_menu"
                    data-menu-vertical="1"
                    className={`aside-menu  min-h-lg-800px ${layoutProps.asideClassesFromConfig}`}
                    {...layoutProps.asideMenuAttr}
                >
                    <AsideDashBoardMenuList layoutProps={layoutProps} menu={menu} />
                </div>
                {/* end::Menu Container */}
            </div>
        </div>
    );
}