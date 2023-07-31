import React, { useState, useEffect, useContext } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import { injectIntl } from "react-intl";
import { GlobalContext } from "../../context/GlobalState";

function AsideRuleMenuList(props) {
    const { layoutProps, menu, intl } = props;
    const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

    const [ruleMenuItemList] = useState([
        {
            title: "Kural Tanımlama",
            component: "test",
            name: "Kural Tanımlama",
            menuRoute: "rule-sub-menu-rule-definition",
        },
    ]);

    useEffect(() => {
        setActiveSubMenu(ruleMenuItemList[0]);
    }, []);

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
              {ruleMenuItemList &&
                ruleMenuItemList.map((item) => {
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

export default injectIntl(AsideRuleMenuList);