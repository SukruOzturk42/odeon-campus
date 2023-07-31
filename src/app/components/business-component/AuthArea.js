import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
const AuthArea = (props) => {
  const { children, auth } = props;
  const { activeSubMenu } = useContext(GlobalContext);

  return (
    <div
      style={
        activeSubMenu.auth === "VIEW"
          ? { pointerEvents: "none", opacity: "0.6" }
          : {}
      }
    >
      {children}
    </div>
  );
};
export default AuthArea;
