/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_helpers";
import CompanyService from "../../../../../services/CompanyService";

export function AsideMenuListCustom({ layoutProps, menu, setActiveComponent }) {
  const [activeItem, setActiveItem] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState([]);
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    CompanyService.getCompaniesByUserId(1).then((response) => {
      setCompanyList(response.data.items);
    });
  }, [menu]);

  const getMenuItemActive = (id) => {
    return id === activeItem ? "menu-item-active  menu-item-open " : "";
  };

  const getMenuComponent = (id) => {
    setActiveItem(id);
    setActiveComponent({
      id: id,
      route: "cm",
    });
  };

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className="menu-section ">
          <h4 className="menu-text">{menu.title}</h4>
          <i className="menu-icon flaticon-more-v2"></i>
        </li>
        {companyList && companyList.map((company) => <h3>{company.name}</h3>)}
        {items &&
          items.map((item) => {
            return (
              <li
                className={`menu-item ${getMenuItemActive(item.route)}`}
                aria-haspopup="true"
                onClick={() => getMenuComponent(item.route)}
                key={item.title}
              >
                <a id={item.component} className="menu-link" to={"/cm"}>
                  <span className="svg-icon menu-icon">
                    <SVG
                      src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}
                    />
                  </span>
                  <span className="menu-text">{item.name}</span>
                </a>
              </li>
            );
          })}
      </ul>
    </>
  );
}
