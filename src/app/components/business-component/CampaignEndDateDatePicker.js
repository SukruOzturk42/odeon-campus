import React, {useEffect, useState} from "react";
import { injectIntl } from "react-intl";
import { DatePicker } from "../base-component/DatePicker";
import { DateTime as DT } from "luxon";
import moment from "moment";

const CampaignEndDateDatePicker = (props) => {
  const { value, onChange, intl, campaignInformation } = props;

  const [state, setState] = useState();

  function disabledDate(current) {
    return campaignInformation.campaignStartDate
      ? current <
          moment(campaignInformation.campaignStartDate, "YYYY-MM-DD HH:mm")
      : current && current < moment().startOf("day");
  }
  const defaultEndDate = () => {
    return moment().set("hour", "23").set("minute", "59");
  }

  function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  function disabledDateTime() {
    const startDate = moment(
      campaignInformation.campaignStartDate,
      "YYYY-MM-DD HH:mm"
    );
    const endDate = moment(value, "YYYY-MM-DD HH:mm");
    if (startDate.toDate().getDay() === endDate.toDate().getDay())
      return {
        disabledHours: () => range(0, startDate.toDate().getHours() + 1),
      };
  }

  const isDateValid = (dateString) => {
    const date = moment(
        dateString,
        "YYYY-MM-DD HH:mm"
    );
    const startDate = moment(
        campaignInformation.campaignStartDate,
        "YYYY-MM-DD HH:mm"
    );

    if(date.isBefore(startDate)){
      return startDate.add(1,'hours');
    }
    return dateString
  }

  const onAreaChangeDate = (event, dateString) => {
    if (event != null) {
      var date = event;
      setState(date);
      onChange({
        id: "campaignEndDate",
        value: isDateValid(dateString),
      });
    } else {
      onChange({
        id: "campaignEndDate",
        value: undefined,
      });
    }
  };

  return (
    <DatePicker
      id="dueDate"
      name="dueDate"
      label={"Bitiş Tarihi"}
      value={value ? value : defaultEndDate()}
      onChange={onAreaChangeDate}
      md={6}
      format="YYYY-MM-DD HH:mm"
      rows={4}
      showTime={{ format: "HH:mm:ss" }}
      disabledDate={disabledDate}
      disabledTime={disabledDateTime}
      error={props.error}
    />
  );
};
export default injectIntl(CampaignEndDateDatePicker);
