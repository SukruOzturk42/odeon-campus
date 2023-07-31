export default (state, action) => {
  switch (action.type) {
    case "SET_ACTIVE_MENU":
      return {
        ...state,
        activeMenu: action.payload,
      };
    case "SET_ACTIVE_SUB_MENU":
      return {
        ...state,
        activeSubMenu: action.payload,
      };

    case "SET_CAMPAIGN_AUTHORIZATIONS":
      return {
        ...state,
        campaignAuthorizations: action.payload,
      };
    case "SET_CAMPAIGN_PERSIST_STATUS":
      return {
        ...state,
        isCampaignPersist: action.payload,
      };
    case "SET_CAMPAIGN":
      return {
        ...state,
        campaign: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_SELECTED_VERSION":
      return {
        ...state,
        version: action.payload,
      };
    case "SET_IS_CAMPAIGN_TYPE_CHANGED":
      return {
        ...state,
        isCampaignTypeChanged: action.payload,
      };

    case "SET_ACTION":
      return {
        ...state,
        action: action.payload,
      };
    default:
      return state;
  }
};
