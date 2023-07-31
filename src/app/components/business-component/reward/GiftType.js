import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const GiftType = (props) => {
  const { onChange, value, md, setSelectedGift } = props;
  const [data, setData] = useState([
    { description: "Fayda Yok", id: 1, name: "none" },
  ]);

  useEffect(() => {
    ReferenceDataService.getRewardGiftTypes()
      .then((response) => {
        response &&
          response.data &&
          setData((prev) => [...prev, ...response.data.items]);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const type = data.find((item) => item.id === value);
    if (type) {
      onChange({ id: "rewardGiftTypeName", value: type.name });
      setSelectedGift((prev) => ({
        ...prev,
        ...type,
      }));
    }
  }, [value, data]);

  const onAreaChange = (event) => {
    const { id, value } = event;
    if (value !== 1) {
      setSelectedGift((prev) => ({
        ...prev,
        ...data.find((item) => item.id === value),
      }));
      onChange(event);
    } else {
      onChange({ id: id, value: undefined });
      setSelectedGift({});
    }
  };

  return (
    <Select
      id="rewardGiftTypeId"
      name="rewardGiftTypeId"
      label={"Ödül Tipi"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value ? value : 1}
      isClearable={false}
    />
  );
};
export default GiftType;
