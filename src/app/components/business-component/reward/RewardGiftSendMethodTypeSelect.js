import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Select from "../../base-component/Select";
import { getAllGiftCodeInformation } from "../../../services/CodeUploadService";
import ReferenceDataService, {getRewardGiftSendMethodTypes} from "../../../services/ReferenceDataService";

const RewardGiftSendMethodTypeSelect = (props) => {
    const { onChange, value, md, error } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        ReferenceDataService.getRewardGiftSendMethodTypes()
            .then((response) => {
                response &&
                response.data &&
                setData((prev) => [...prev, ...response.data.items]);
            })
            .catch((error) => {});
    }, []);

    const onAreaChange = (event) => {
        onChange(event);
    };

    return (
        <Select
            id="sendMethodTypeId"
            name="sendMethodTypeId"
            label={"Gönderim Yöntemi"}
            md={md ? md : 12}
            onChange={onAreaChange}
            options={data.map((item) => {
                return { label: item.description, value: item.id };
            })}
            value={value}
            error={error}
        />
    );
};
export default RewardGiftSendMethodTypeSelect;
