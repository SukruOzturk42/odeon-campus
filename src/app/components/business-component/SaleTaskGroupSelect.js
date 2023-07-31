import React, { useEffect, useState } from "react";
import Select from "../base-component/Select";
import { getTasks } from "../../services/TaskService";

const SaleTaskGroupSelect = (props) => {
  const { onChange, value, md, error } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    getTasks()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.name, value: item.id };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <Select
      id="taskGroupId"
      name="taskGroupId"
      label={"Satıs Task Grubu"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
    />
  );
};
export default SaleTaskGroupSelect;
