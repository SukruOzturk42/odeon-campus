/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {
  useMemo,
  useLayoutEffect,
  useEffect,
  useState,
  useContext,
} from "react";
import { injectIntl } from "react-intl";
import objectPath from "object-path";
import { useLocation, useHistory } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";
import { BreadCrumbs } from "./components/BreadCrumbs";
import {
  getBreadcrumbsAndTitle,
  useSubheader,
} from "../../_core/MetronicSubheader";
import { useHtmlClassService } from "../../_core/MetronicLayout";
import { useSelector } from "react-redux";
import { GlobalContext } from "../../../../context/GlobalState";
import jwtDecoder from "jwt-decode";
import { getFullName } from "../../../../services/TokenService";

const SubHeader = (props) => {
  const { intl } = props;
  const uiService = useHtmlClassService();
  const location = useLocation();
  const subheader = useSubheader();
  const [userName, setUserName] = useState("");
  const { user } = useContext(GlobalContext);

  const layoutProps = useMemo(() => {
    return {
      config: uiService.config,
      subheaderFixed: objectPath.get(uiService.config, "subheader.fixed"),
      subheaderMobileToggle: objectPath.get(
        uiService.config,
        "subheader.mobile-toggle"
      ),
      subheaderCssClasses: uiService.getClasses("subheader", true),
      subheaderContainerCssClasses: uiService.getClasses(
        "subheader_container",
        true
      ),
    };
  }, [uiService]);

  useLayoutEffect(() => {
    const aside = getBreadcrumbsAndTitle("kt_aside_menu", location.pathname);
    const header = getBreadcrumbsAndTitle("kt_header_menu", location.pathname);
    const breadcrumbs =
      aside && aside.breadcrumbs.length > 0
        ? aside.breadcrumbs
        : header.breadcrumbs;
    subheader.setBreadcrumbs(breadcrumbs);
    subheader.setTitle(
      aside && aside.title && aside.title.length > 0
        ? aside.title
        : header.title
    );
    // eslint-disable-next-line
  }, [location.pathname]);
  useSelector((state) => state.user);
  //const authToken = useSelector((state) => state.auth.authToken);
  const authToken = localStorage.getItem("access_token") != null;

  // Do not remove this useEffect, need from update title/breadcrumbs outside (from the page)
  useEffect(() => {}, [subheader]);
  useEffect(() => {
    if (authToken) {
      setUserName(getFullName());
    }
  }, []);

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("cm");
    history.push("/logout");
  };

  return (
    <div
      id="kt_subheader"
      className={`subheader py-3 py-lg-8 ${layoutProps.subheaderCssClasses}`}
    >
      <div
        className={`${layoutProps.subheaderContainerCssClasses} d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap`}
      >
        {/* Info */}
        <div className="d-flex align-items-center flex-wrap mr-1">
          {/* begin::Mobile Toggle */}
          {layoutProps.subheaderMobileToggle && (
            <button
              className="burger-icon burger-icon-left mr-4 d-inline-block d-lg-none"
              id="kt_subheader_mobile_toggle"
            >
              <span />
            </button>
          )}
          {/* end::Mobile Toggle */}

          {/* begin::Heading */}
          <div className="d-flex align-items-baseline mr-5">
            {/* begin::Title */}
            <h2 className="subheader-title text-dark font-weight-bold my-2 mr-3">
              {subheader.title}
            </h2>
            {/* end::Title */}

            <BreadCrumbs items={subheader.breadcrumbs} />
          </div>
          {/* end::Heading */}
        </div>
        {/* Info */}

        {/* Toolbar */}
        <div className="d-flex align-items-center">
          {/* <button
            type="button"
            className={`btn btn-fixed-height ${
              layoutProps.subheaderFixed ? "btn-default" : "btn-white"
            } btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2`}
          >
            <span className="svg-icon svg-icon-success svg-icon-lg">
              <SVG
                src={toAbsoluteUrl(
                  "/media/svg/icons/Communication/Add-user.svg"
                )}
              />
            </span>
            {` `}New Member
          </button> */}

          {/* <QuickActions /> */}

          <button
            type="button"
            className={`btn btn-fixed-height ${
              layoutProps.subheaderFixed ? "btn-default" : "btn-white"
            } btn-hover-primary font-weight-bold px-2 px-lg-5 mr-2`}
            onClick={logout}
          >
            <span className="svg-icon svg-icon-success svg-icon-lg">
              <SVG src={toAbsoluteUrl("/media/svg/icons/General/User.svg")} />
            </span>
            {` `}
            {userName}
            {` `} (
            {intl.formatMessage({
              id: "AUTH.LOGOUT.BUTTON",
            })}
            )
          </button>
        </div>
      </div>
    </div>
  );
};
export default injectIntl(SubHeader);
