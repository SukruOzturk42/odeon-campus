import React, {useEffect, useState} from "react";
import { Input } from "../../base-component/Input";

const DashboardDetailFilter = (props) => {

    const {onChange,filterObject} = props;

    return (
        <Input
            id="contactNo"
            name="contactNo"
            label={"Müşteri numarası"}
            onChange={onChange}
            value={filterObject.contactNo ? filterObject.contactNo : null}
        />
    );
};
export default DashboardDetailFilter;
