import React, { useEffect } from "react";
import { useSubheader } from "../../../_metronic/layout";

export const MainOtmPage = () => {
  const suhbeader = useSubheader();
  useEffect(() => {
    suhbeader.setTitle("OTM");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>OTM (Odeon Task Management)</>;
};
