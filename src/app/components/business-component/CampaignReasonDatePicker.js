import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { DatePicker } from "../base-component/DatePicker";
import { DateTime as DT } from "luxon";
import moment from "moment";

const CampaignReasonDatePicker = (props) => {
  const { value, onChange, error, intl, md } = props;
  const [state, setState] = useState();

  const onAreaChange = (event) => {
    if (event !== null && event !== undefined) {
      const date = event;
      onChange({
        id: "decisionDate",
        value: moment(date, "YYYY-MM-DD HH:mm"),
      });
    } else {
      onChange({
        id: "decisionDate",
        value: DT.now(),
      });
    }
  };

  return (
    <DatePicker
      id={"decisionDate"}
      name={"decisionDate"}
      label={"Karar Tarihi"}
      value={value}
      onChange={onAreaChange}
      md={md ? md : 12}
      rows={3}
      error={error}
      allowClear={false}
    />
  )
}

export default injectIntl(CampaignReasonDatePicker);