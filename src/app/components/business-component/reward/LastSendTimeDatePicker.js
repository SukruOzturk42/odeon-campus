import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { DatePicker } from "../../base-component/DatePicker";
import { DateTime as DT } from "luxon";
import moment from "moment";

const LastSendTimeDatePicker = (props) => {
  const { value, onChange, disabled } = props;

  const [state, setState] = useState();

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  }

  const onAreaChangeDate = (event, dateString) => {

    var date = event;
    setState(date);
    onChange({
      id: "lastSendTime",
      value: dateString,
    });

  };

  return (
    <DatePicker
      id="lastSendTime"
      name="lastSendTime"
      label={"Son Gösterim Tarihi"}
      value={value}
      onChange={onAreaChangeDate}
      disabledDate={disabledDate}
      md={6}
      format="YYYY-MM-DD HH:mm"
      rows={4}
      showTime={{ format: "HH:mm" }}
      error={props.error}
      disabled={disabled ? disabled : false}
    />
  );
};
export default injectIntl(LastSendTimeDatePicker);
