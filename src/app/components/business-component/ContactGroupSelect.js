import React, { useEffect, useState } from "react";
import Select from "../base-component/Select";
import { getAllContactGroups } from "../../services/contactService";

const ContactGroupSelect = (props) => {
  const { onChange, value, md, error } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllContactGroups()
      .then((response) => {
        response.data &&
          setData(
            response.data.items.map((item) => {
              return { label: item.groupName, value: item.contactGroupId };
            })
          );
      })
      .catch((error) => {});
  }, []);

  return (
    <Select
      id="contactGroupId"
      name="contactGroupId"
      label={"Müşteri Grubu"}
      md={md ? md : 12}
      onChange={onChange}
      options={data}
      value={value}
      error={error}
    />
  );
};
export default ContactGroupSelect;
