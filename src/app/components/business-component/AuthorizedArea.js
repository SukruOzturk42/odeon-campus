import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";

const AuthorizedArea = (props) => {
  const { children, authKey } = props;
  const { version, campaign, campaignAuthorizations } = useContext(
    GlobalContext
  );
  const [isPageEnabled, setIsPageEnabled] = useState(false);

  useEffect(() => {
    if (campaignAuthorizations) {
      const page_edit = campaignAuthorizations.some((t) => t.name === authKey);

      setIsPageEnabled(page_edit);
    }
  }, [campaignAuthorizations]);

  return (
    <div
      style={
        campaign.id && (!isPageEnabled || !version.isActiveVersion)
          ? { pointerEvents: "none", opacity: "0.6" }
          : {}
      }
    >
      {children}
    </div>
  );
};
export default AuthorizedArea;
