import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { getInitialRule } from "../common/utils/Util";

const initialState = {
  activeMenu: {},
  activeSubMenu: {},
  isCampaignPersist: true,
  isCampaignTypeChanged: false,
  campaignAuthorizations: [],
  campaign: { campaignInformation: {}, campaignRuleGroups: [getInitialRule()] },
  user: {},
  action: {},
  version: { isActiveVersion: true },
};

//const localState = JSON.parse(localStorage.getItem("cm"));

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  /*useEffect(() => {
    localStorage.setItem("cm", JSON.stringify(state));
  }, [state]);*/

  useEffect(() => {
    setCampaign({
      campaignInformation: {},
      campaignRuleGroups: [getInitialRule()],
    });
  }, [state.activeMenu]);

  function setCampaign(campaign) {
    dispatch({
      type: "SET_CAMPAIGN",
      payload: campaign,
    });
  }

  function setActiveMenu(menu) {
    dispatch({
      type: "SET_ACTIVE_MENU",
      payload: menu,
    });
  }

  function setUser(user) {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }

  function setCampaignAuthorizations(campaignAuthorizations) {
    dispatch({
      type: "SET_CAMPAIGN_AUTHORIZATIONS",
      payload: campaignAuthorizations,
    });
  }
  function setCampaignPersistStatus(isCampaignPersist) {
    dispatch({
      type: "SET_CAMPAIGN_PERSIST_STATUS",
      payload: isCampaignPersist,
    });
  }
  function setActiveSubMenu(menu) {
    dispatch({
      type: "SET_ACTIVE_SUB_MENU",
      payload: menu,
    });
  }

  function setVersion(version) {
    dispatch({
      type: "SET_SELECTED_VERSION",
      payload: version,
    });
  }

  function setIsCampaignTypeChanged(isChanged) {
    dispatch({
      type: "SET_IS_CAMPAIGN_TYPE_CHANGED",
      payload: isChanged,
    });
  }

  function setAction(action) {
    dispatch({
      type: "SET_ACTION",
      payload: action,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        activeMenu: state.activeMenu,
        setActiveMenu: setActiveMenu,
        activeSubMenu: state.activeSubMenu,
        setActiveSubMenu: setActiveSubMenu,
        setCampaignPersistStatus: setCampaignPersistStatus,
        isCampaignPersist: state.isCampaignPersist,
        setCampaignAuthorizations: setCampaignAuthorizations,
        campaignAuthorizations: state.campaignAuthorizations,
        setCampaign: setCampaign,
        campaign: state.campaign,
        user: state.user,
        setUser: setUser,
        setVersion: setVersion,
        version: state.version,
        isCampaignTypeChanged: state.isCampaignTypeChanged,
        setIsCampaignTypeChanged: setIsCampaignTypeChanged,
        setAction: setAction,
        action: state.action,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
