import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import ReferenceDataService from "../../../services/ReferenceDataService";

const DiscountKindSelect = (props) => {
  const { onChange, value, md, type } = props;
  const [data, setData] = useState([{ description: "Fayda Yok", id: 1 }]);

  /*useEffect(() => {
    ReferenceDataService.getRewardGiftTypes()
      .then((response) => {
        response &&
          response.data &&
          setData((prev) => [...prev, ...response.data.items]);
      })
      .catch((error) => {});
  }, []);*/

  const onAreaChange = (event) => {
    const { id, value } = event;

    value !== 1 ? onChange(event) : onChange({ id: id, value: undefined });
  };

  return (
    <Select
      id="discountKindId"
      name="discountKindId"
      label={"İndirim Şekli"}
      options={
        type && type === "participation"
          ? [
              { label: "İndirim Yok", value: 1 },
              { label: "Kodlu İndirim", value: 4 },
            ]
          : [
              { label: "İndirim Yok", value: 1 },
              { label: "Oran", value: 2 },
              { label: "Tutar", value: 3 },
            ]
      }
      value={value ? value : 1}
      md={md ? md : 12}
      onChange={onAreaChange}
      isClearable={false}
    />
  );
};
export default DiscountKindSelect;
