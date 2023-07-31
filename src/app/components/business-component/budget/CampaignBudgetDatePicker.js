import React, { useState } from "react";
import { injectIntl } from "react-intl";
import { DatePicker } from "../../base-component/DatePicker";
import { DateTime as DT } from "luxon";
import moment from "moment";

const CampaignBudgetDatePicker = (props) => {
    const { value, onChange, intl } = props;

    const [state, setState] = useState();

    const onAreaChangeDate = (event) => {
        if (event != null) {
            var date = event;
            setState(date);
            onChange({
                id: "budgetDate",
                value: moment(date, "YYYY-MM-DD HH:mm"),
            });
        } else {
            onChange({
                id: "budgetDate",
                value: "",
            });
        }
    };

    return (
        <DatePicker
            id="budgetDate"
            name="budgetDate"
            label={"Bütçe Tarihi"}
            value={value}
            onChange={onAreaChangeDate}
            md={5}
            rows={3}
        />
    );
};
export default injectIntl(CampaignBudgetDatePicker);
