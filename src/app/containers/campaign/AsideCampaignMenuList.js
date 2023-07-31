/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../context/GlobalState";
import { useHistory } from "react-router-dom";
import ConfirmModal from "../../components/base-component/ConfirmModal";
import { hasUserAuthorization } from "../../services/TokenService";

function AsideCampaignMenuList(props) {
  const { layoutProps, menu, intl } = props;
  const { activeMenu, activeSubMenu, setActiveSubMenu, campaign } = useContext(
    GlobalContext
  );

  const [campaignMenuItemList, setCampaignMenuItemList] = useState(
    menu.subMenuItems
  );
  const [showChanePageConfirmModal, setShowChanePageConfirmModal] = useState(
    false
  );
  const history = useHistory();
  const [tempMenu, setTempMenu] = useState();
  useEffect(() => {
    menu.subMenuItems && setActiveSubMenu(menu.subMenuItems[0]);
  }, [activeMenu]);

  useEffect(() => {
    if (hasUserAuthorization() && campaign && campaign.id) {
      setCampaignMenuItemList(menu.subMenuItems);
    } else {
      const filteredSubMenu = menu.subMenuItems.filter(
        (item) => item.menuRoute === "cm-sub-menu-create-campaign"
      );
      setCampaignMenuItemList(filteredSubMenu);
    }
  }, [campaign.id]);

  const getMenuItemActive = (item) => {
    return activeSubMenu.title === item.title
      ? "menu-item-active  menu-item-open "
      : "";
  };

  const handleChanePageRequest = (item) => {
    setTempMenu(item);
    if (
      hasUserAuthorization() &&
      activeSubMenu.menuRoute === menu.subMenuItems[0].menuRoute
    ) {
      setShowChanePageConfirmModal(true);
    } else {
      setActiveSubMenu(item);
    }
  };

  const handleTabChange = () => {
    setActiveSubMenu(tempMenu);
    setShowChanePageConfirmModal(false);
  };
  return (
    <>
      {menu.title && (
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li className="menu-section ">
            <h4 className="menu-text">
              {intl.formatMessage({ id: menu.title })}
            </h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li>
          {campaignMenuItemList &&
            campaignMenuItemList.map((item) => {
              return (
                <li
                  className={`menu-item ${getMenuItemActive(item)}`}
                  aria-haspopup="true"
                  onClick={() => handleChanePageRequest(item)}
                  key={item.title}
                >
                  <a id={item.component} className="menu-link" to={"/cm"}>
                    <span className="svg-icon menu-icon">
                      <SVG
                        src={toAbsoluteUrl(
                          "/media/svg/icons/Design/Layers.svg"
                        )}
                      />
                    </span>
                    <span className="menu-text">{item.title}</span>
                  </a>
                </li>
              );
            })}
        </ul>
      )}
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
export default injectIntl(AsideCampaignMenuList);
