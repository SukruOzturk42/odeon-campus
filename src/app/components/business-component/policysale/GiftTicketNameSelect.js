import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select from "../../base-component/Select";

import {getPolicySaleGiftCodeInformation} from "../../../services/PolicySaleRewardCampaignService";

const GiftTicketNameSelect = (props) => {
    const { onChange, value, md, error } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        getPolicySaleGiftCodeInformation()
            .then((response) => {
                setData(
                    response.map((item) => {
                        return {
                            label:
                                item.companyInformationName +
                                "-" +
                                item.rewardGiftTicketTypeName,
                            value: item.id,
                        };
                    })
                );
            })
            .catch((error) => {});
    }, []);

    const onAreaChange = (event) => {
        onChange(event);
    };

    return (
        <Select
            id="policySaleGiftCodeInformationId"
            name="policySaleGiftCodeInformationId"
            label={"Hediye Çeki ismi"}
            md={md ? md : 12}
            onChange={onAreaChange}
            options={data}
            value={value}
            error={error}
        />
    );
};
export default GiftTicketNameSelect;
