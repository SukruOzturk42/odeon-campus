import React, { useState, useEffect, useContext } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../context/GlobalState";

function AsideContactMenuList(props) {
  const { layoutProps, menu, intl } = props;
  const { activeMenu, activeSubMenu, setActiveSubMenu } = useContext(
    GlobalContext
  );

  const [codeMenuItemList] = useState([
    {
      title: "Müşteri Grubu",
      component: "test",
      name: "Müşteri Grubu",
      menuRoute: "contact-sub-menu-customer-upload",
    },
  ]);

  useEffect(() => {
    setActiveSubMenu(codeMenuItemList[0]);
  }, [activeMenu]);

  const getMenuItemActive = (item) => {
    return activeSubMenu.title === item.title
      ? "menu-item-active  menu-item-open "
      : "";
  };

  const handleMenuItemClick = (item) => {
    setActiveSubMenu(item);
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
          {codeMenuItemList &&
            codeMenuItemList.map((item) => {
              return (
                <li
                  className={`menu-item ${getMenuItemActive(item)}`}
                  aria-haspopup="true"
                  onClick={() => handleMenuItemClick(item)}
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
                    <span className="menu-text">{item.name}</span>
                  </a>
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}

export default injectIntl(AsideContactMenuList);
