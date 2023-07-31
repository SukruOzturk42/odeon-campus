import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Button from "../base-component/Button";
import ReferenceDataService from "../../services/ReferenceDataService";

const NewCampaignButton = (props) => {
  const { onAreaChange, intl, value, md, disabled } = props;
  const [data, setData] = useState([]);

  return (
    <Button
      id="newCampaignButton"
      name="newCampaignButton"
      label={"Yeni Kampanya Tanımla"}
      text={"Yeni Kampanya Tanımla"}
      md={md ? md : 12}

    />
  );
};
export default NewCampaignButton;
