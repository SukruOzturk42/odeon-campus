import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const GiftDeliveryType = (props) => {
  const { onChange, value, md, setSelectedGifDeliveryType, error } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getRewardGiftDeliveryTypes()
      .then((response) => {
        response && response.data && setData(response.data.items);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const type = data.find((item) => item.id === value);
    if (type) {
      setSelectedGifDeliveryType((prev) => ({
        ...prev,
        ...type,
      }));
      onChange({ id: "rewardGiftDeliveryTypeName", value: type.name });
    }
  }, [value, data]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    setSelectedGifDeliveryType((prev) => ({
      ...prev,
      ...data.find((item) => item.id === value),
    }));
    onChange(event);
  };

  return (
    <Select
      id="rewardGiftDeliveryTypeId"
      name="rewardGiftDeliveryTypeId"
      label={"Hediye Verilme Şekli"}
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
export default GiftDeliveryType;
