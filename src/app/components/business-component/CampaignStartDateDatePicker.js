import React, { createRef, useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { DatePicker } from "../base-component/DatePicker";
import moment from "moment";

const CampaignStartDateDatePicker = (props) => {
  const { value, onChange, disabled } = props;

  const [state, setState] = useState();

  useEffect(() => {
    setState(defaultStartDate());
  }, []);

  useEffect(() => {
    if (!value) {
      onChange({
        id: "campaignStartDate",
        value: defaultStartDate().format("YYYY-MM-DD HH:mm"),
      });
      onChange({
        id: "campaignEndDate",
        value: defaultStartDate()
          .set("hour", "23")
          .set("minute", "59")
          .format("YYYY-MM-DD HH:mm"),
      });
    }
  }, [value]);
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().startOf("day");
  }

  const defaultEndDate = (dateString) => {
    const startDate = moment(dateString, "YYYY-MM-DD HH:mm");
    return startDate.set("hour", "23").set("minute", "59");
  };
  const defaultStartDate = () => {
    return moment().add(1, "H");
  };

  const isDateValid = (dateString) => {
    const date = moment(dateString, "YYYY-MM-DD HH:mm");
    if (date.isBefore(moment().format("YYYY-MM-DD HH:mm"))) {
      return moment().format("YYYY-MM-DD HH:mm");
    }
    return dateString;
  };

  const onAreaChangeDate = (event, dateString) => {
    if (event != null) {
      onChange({
        id: "campaignEndDate",
        value: undefined,
      });
      var date = event;
      setState(date);
      onChange({
        id: "campaignStartDate",
        value: isDateValid(dateString),
      });
      onChange({
        id: "campaignEndDate",
        value: defaultEndDate(dateString).format("YYYY-MM-DD HH:mm"),
      });
    } else {
      onChange({
        id: "campaignStartDate",
        value: undefined,
      });
    }
  };

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => {
    let hourRange =
      state.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
        ? range(0, 24).splice(0, moment().hour() + 1)
        : range(0, 24).splice(0, 0);
    return {
      disabledHours: () => hourRange,
    };
  };
  return (
    <DatePicker
      id="campaignStartDate"
      name="campaignStartDate"
      label={"Başlangıç Tarihi"}
      value={value ? value : defaultStartDate()}
      onChange={onAreaChangeDate}
      disabledDate={disabledDate}
      md={6}
      format="YYYY-MM-DD HH:mm"
      rows={4}
      showTime={{ format: "HH:mm" }}
      error={props.error}
      disabled={disabled ? disabled : false}
      disabledTime={disabledDateTime}
    />
  );
};
export default injectIntl(CampaignStartDateDatePicker);
