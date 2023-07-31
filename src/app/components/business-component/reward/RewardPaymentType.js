import React, { useEffect, useState } from "react";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const RewardCompanyInformation = (props) => {
  const { onChange, value, md, error } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    ReferenceDataService.getRewardCustomerPaymentTypes()
      .then((response) => {
        response &&
          response.data &&
          setData((prev) => [...prev, ...response.data.items]);
      })
      .catch((error) => {});
  }, []);

  const onAreaChange = (event) => {
    onChange(event);
  };

  return (
    <Select
      id="rewardGiftPaymentTypeId"
      name="rewardGiftPaymentTypeId"
      label={"Müşteri Çek Hakedişi"}
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
export default RewardCompanyInformation;
