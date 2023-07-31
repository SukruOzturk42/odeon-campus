import React, { useMemo, useState, useEffect, useContext } from "react";
import objectPath from "object-path";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../_helpers";
import { Brand } from "../brand/Brand";
import { NavLink, useHistory } from "react-router-dom";
import { injectIntl } from "react-intl";
import { getMenuItemByUserRoleName } from "../../../../services/MenuItemService";
import { cmMenuRoutes } from "../../../../routes/cm";
import { useLocation } from "react-router-dom";
import {
  getUserRoleName,
  hasUserAuthorization,
} from "../../../../services/TokenService";
import { GlobalContext } from "../../../../context/GlobalState";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import { subMenus } from "../../../../containers/campaign/cm";
import { da } from "date-fns/locale";

function Aside({ intl }) {
  const { activeMenu, setActiveMenu, activeSubMenu } = useContext(
    GlobalContext
  );
  const uiService = useHtmlClassService();
  const location = useLocation();
  const [menuList, setMenuList] = useState([]);
  const [showChanePageConfirmModal, setShowChanePageConfirmModal] = useState(
    false
  );
  const [tempMenu, setTempMenu] = useState();

  const history = useHistory();

  useEffect(() => {
    const roleName = getUserRoleName();
    getMenuItemByUserRoleName(roleName).then((response) => {
      if (response.data && response.data.items) {
        const data = response.data.items;
        setMenuList(data);
        setActiveMenu(data[0]);
        if (data.length > 0) {
          history.push("/" + data[0].route);
        } else {
          history.push("/cm-campaigns");
        }
      }
    });
  }, []);

  const getRouteName = (path) => {
    let route = path.replace("/", "");
    if (route === "" || route === "cm") {
      return "cm-campaign";
    }
    return route;
  };

  useEffect(() => {
    if (menuList.length > 0) {
      menuList &&
        setActiveMenu(
          menuList.find(
            (item) => item.route === getRouteName(location.pathname)
          )
        );
    }
  }, [location.pathname]);

  const layoutProps = useMemo(() => {
    return {
      asideClassesFromConfig: uiService.getClasses("aside", true),
      asideSecondaryDisplay: objectPath.get(
        uiService.config,
        "aside.secondary.display"
      ),
      asideSelfMinimizeToggle: objectPath.get(
        uiService.config,
        "aside.self.minimize.toggle"
      ),
      extrasSearchDisplay: objectPath.get(
        uiService.config,
        "extras.search.display"
      ),
      extrasNotificationsDisplay: objectPath.get(
        uiService.config,
        "extras.notifications.display"
      ),
      extrasQuickActionsDisplay: objectPath.get(
        uiService.config,
        "extras.quick-actions.display"
      ),
      extrasQuickPanelDisplay: objectPath.get(
        uiService.config,
        "extras.quick-panel.display"
      ),
      extrasLanguagesDisplay: objectPath.get(
        uiService.config,
        "extras.languages.display"
      ),
      extrasUserDisplay: objectPath.get(
        uiService.config,
        "extras.user.display"
      ),
    };
  }, [uiService]);

  const handleTabChange = () => {
    setActiveMenu(
      menuList.find((item) => item.menuRoute === tempMenu.menuRoute)
    );
    history.push({
      pathname: tempMenu.route,
    });
    setShowChanePageConfirmModal(false);
  };

  const handleChanePageRequest = (menu) => {
    if (menu.menuRoute !== activeMenu.menuRoute) {
      if (
        hasUserAuthorization() &&
        activeSubMenu.menuRoute === subMenus[0].menuRoute
      ) {
        setTempMenu(menu);
        setShowChanePageConfirmModal(true);
      } else {
        setActiveMenu(
          menuList.find((item) => item.menuRoute === menu.menuRoute)
        );
        history.push({
          pathname: menu.route,
        });
      }
    }
  };

  const getComponent = () => {
    return activeMenu
      ? cmMenuRoutes[activeMenu.menuRoute]
      : cmMenuRoutes["cm-menu-company"];
  };
  let ContentComponent = getComponent();

  return (
    <>
      <div
        id="kt_aside"
        className={`aside aside-left d-flex ${layoutProps.asideClassesFromConfig}`}
      >
        <div className="aside-primary d-flex flex-column align-items-center flex-row-auto">
          <Brand />
          <div className="aside-nav d-flex flex-column align-items-center flex-column-fluid py-5 scroll scroll-pull">
            {/* begin::Nav */}
            <ul className="list-unstyled flex-column" role="tablist">
              {menuList.length > 0 &&
                menuList.map((menu) => (
                  <>
                    <div>
                      <li
                        className="nav-item mb-3"
                        data-toggle="tooltip"
                        data-placement="rigth"
                        data-container="body"
                        data-boundary="window"
                        title={menu.title}
                        key={menu.name}
                      >
                        <OverlayTrigger
                          placement="right"
                          overlay={
                            <Tooltip id="metronic-features">
                              {intl.formatMessage({ id: menu.name })}
                            </Tooltip>
                          }
                        >
                          <span
                            className={`nav-link btn btn-icon btn-clean btn-lg ${activeMenu.menuRoute ===
                              menu.menuRoute && "active"}`}
                            onClick={() => handleChanePageRequest(menu)}
                            role="tab"
                          >
                            <span className="svg-icon svg-icon-lg">
                              <SVG
                                title=" "
                                src={toAbsoluteUrl(
                                  "/media/svg/icons/Food/" + menu.icon
                                )}
                              />
                            </span>
                          </span>
                        </OverlayTrigger>
                      </li>
                    </div>
                  </>
                ))}
            </ul>
          </div>
        </div>

        {layoutProps.asideSecondaryDisplay && activeMenu && activeMenu.name && (
          <>
            <div className="aside-secondary d-flex flex-row-fluid">
              <div className="aside-workspace scroll scroll-push my-2">
                <div className="tab-content">
                  <ContentComponent menu={activeMenu} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ConfirmModal
        show={showChanePageConfirmModal}
        title={"Uyarı"}
        bodyMessage={
          "Kaydetmediğiniz veriler kaybolacak, Sayfa değiştirmek istediğinizden emin misiniz?"
        }
        onOk={handleTabChange}
        setShow={setShowChanePageConfirmModal}
      />
    </>
  );
}
export default injectIntl(Aside);
