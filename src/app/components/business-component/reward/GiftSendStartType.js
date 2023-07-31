import React, {useContext, useEffect, useState} from "react";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";
import {GlobalContext} from "../../../context/GlobalState";

const GiftSendStartType = (props) => {
  const { onChange, value, md, error } = props;
  const [data, setData] = useState([]);
  const {campaign} = useContext(GlobalContext)
  useEffect(() => {
    setData([])
    ReferenceDataService.getRewardDeliveryStartType(campaign.campaignInformation.campaignTypeId)
      .then((response) => {
        response &&
          response.data &&
          setData((prev) => [...prev, ...response.data.items]);
      })
      .catch((error) => {});
  }, [campaign.campaignInformation.campaignTypeId]);

  const onAreaChange = (event) => {
    onChange(event);
  };

  return (
    <Select
      id="rewardGiftDeliveryStartTypeId"
      name="rewardGiftDeliveryStartTypeId"
      label={"Başlangıç Yöntemi"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value}
      error={error}
    />
  );
};
export default GiftSendStartType;
