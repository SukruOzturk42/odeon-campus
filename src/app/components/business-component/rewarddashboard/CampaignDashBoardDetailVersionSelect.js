import React, { useEffect, useState, useContext } from "react";
import Select from "../../base-component/Select";
import { GlobalContext } from "../../../context/GlobalState";
import ReferenceDataService from "../../../services/ReferenceDataService";

const CampaignDashBoardDetailVersionSelect = (props) => {
    const [data, setData] = useState([]);
    const {
        filterObject,
        onChange
    } = props;

    useEffect(() => {
        ReferenceDataService.getCampaignVersions(props.campaignId)
            .then((response) => {
                if (response.data) {
                    setData(response.data.items);
                }
            })
            .catch((error) => {});
    }, []);



    return (
        <Select
            id="version"
            name="version"
            label={"Kampanya Versionları"}
            onChange={onChange}
            options={data.map((item) => {
                return { label: item.version + "", value: item.id };
            })}
            value={filterObject.version}
            isClearable={true}
        />
    );
};
export default CampaignDashBoardDetailVersionSelect;
