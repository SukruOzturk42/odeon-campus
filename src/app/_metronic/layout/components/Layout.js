import React, { useMemo, useContext } from "react";
import objectPath from "object-path";
import { useHtmlClassService } from "../_core/MetronicLayout";
import { HeaderMobile } from "./header-mobile/HeaderMobile";
import Aside from "./aside/Aside";
import { Footer } from "./footer/Footer";
import { LayoutInit } from "./LayoutInit";
import SubHeader from "./subheader/SubHeader";
import { ScrollTop } from "./extras/ScrollTop";
import { AnimateLoading } from "../../_partials/controls";
import { GlobalContext } from "../../../context/GlobalState";

export function Layout({ children }) {
  const { activeMenu, setActiveMenu } = useContext(GlobalContext);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      selfLayout: objectPath.get(uiService.config, "self.layout"),
      subheaderDisplay: objectPath.get(uiService.config, "subheader.display"),
      contentCssClasses: uiService.getClasses("content", true),
      contentContainerClasses: uiService.getClasses("content_container", true),
      contentExtended: objectPath.get(uiService.config, "content.extended"),
    };
  }, [uiService]);

  return layoutProps.selfLayout !== "blank" ? (
    <>
      <HeaderMobile />
      <div className="d-flex flex-column flex-root">
        <div className="d-flex flex-row flex-column-fluid page">
          {activeMenu && <Aside />}

          <div
            className="d-flex flex-column flex-row-fluid wrapper"
            id="kt_wrapper"
          >
            <div
              id="kt_content"
              className={`content ${layoutProps.contentCssClasses} d-flex flex-column flex-column-fluid`}
            >
              <AnimateLoading />
              {layoutProps.subheaderDisplay && <SubHeader />}

              {layoutProps.contentExtended && <>{children}</>}

              {!layoutProps.contentExtended && (
                <div className="d-flex flex-column-fluid">
                  <div className={layoutProps.contentContainerClasses}>
                    {children}
                  </div>
                </div>
              )}
            </div>

            <Footer />
          </div>
        </div>
      </div>
      <ScrollTop />
      <LayoutInit />
    </>
  ) : (
    <div className="d-flex flex-column flex-root">{children}</div>
  );
}
