import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { DatePicker } from "../../base-component/DatePicker";
import { DateTime as DT } from "luxon";
import moment from "moment";

const CampaignCodeExpirationDataPicker = (props) => {
  const { value, onChange, error, intl, md, isDisabled } = props;
  const [state, setState] = useState();

  const onAreaChange = (event) => {
    if (event !== null && event !== undefined) {
      const date = event;
      onChange({
        id: "codeExpirationDate",
        value: moment(date, "YYYY-MM-DD HH:mm"),
      });
    } else {
      onChange({
        id: "codeExpirationDate",
        value: DT.now(),
      });
    }
  };

  return (
    <DatePicker
      id={"codeExpirationDate"}
      name={"codeExpirationDate"}
      label={"Kod Geçerlilik Tarihi"}
      value={value}
      onChange={onAreaChange}
      md={md ? md : 12}
      rows={3}
      error={error}
      disabled={isDisabled}
    />
  );
};
export default injectIntl(CampaignCodeExpirationDataPicker);
