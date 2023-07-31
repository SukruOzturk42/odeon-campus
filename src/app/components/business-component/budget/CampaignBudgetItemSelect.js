import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../../base-component/Select";
import {getCampaignBudgetItemTypes} from "../../../services/CampaignBudgetService";
import {DatePicker} from "../../base-component/DatePicker";

const CampaignBudgetItemSelect = (props) => {
    const { onChange, intl, value, md,disabled,error} = props;

    const [data,setData] = useState([]);

    useEffect(() => {
        getCampaignBudgetItemTypes()
            .then((response) => {
                response.data &&
                setData(
                    response.data.items.map((item) => {
                        return {label: item.description, value: item.id};
                    })
                );
            })
            .catch((error) => {
            });
    }, []);
    return (
        <Select
            id="budgetItemId"
            name="budgetItemId"
            label={"Bütçe Kalemi"}
            md={md ? md : 12}
            onChange={onChange}
            options={data}
            value={value}
            isDisabled={disabled}
            error={error}
        />
    );
};
export default CampaignBudgetItemSelect;
