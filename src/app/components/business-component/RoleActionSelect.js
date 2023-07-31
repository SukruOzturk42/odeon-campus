import React, { useEffect, useState, useContext } from "react";
import Select from "../base-component/Select";
import _ from "lodash";
import { GlobalContext } from "../../context/GlobalState";

const RoleActionSelect = (props) => {
  const { onChange, value, md, version } = props;
  const [data, setData] = useState([]);
  const { campaignAuthorizations, setAction } = useContext(GlobalContext);

  useEffect(() => {
    if (campaignAuthorizations) {
      const actionAuth = _.filter(campaignAuthorizations, { type: "action" });
      setData(actionAuth);
    }
  }, [campaignAuthorizations]);

  const onAreaChange = (event) => {
    const action = _.find(data, { id: event.value });
    setAction(action);
    onChange(event);
  };

  return (
    <Select
      id="actionId"
      name="actionId"
      label={"Aksiyon"}
      md={md ? md : 12}
      onChange={onAreaChange}
      options={data.map((item) => {
        return { label: item.description, value: item.id };
      })}
      value={value}
      isDisabled={(version && !version.isActiveVersion) || data.length <= 0}
    />
  );
};
export default RoleActionSelect;
