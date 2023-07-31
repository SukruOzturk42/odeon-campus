import React, {useEffect, useState} from "react";
import Select from "../../base-component/Select";

const DeliveryTypeSelect = (props) => {

    const {onChange,filterObject} = props;
    const [data, setData] = useState([        {label : "Hata alanlar", value: "Hata Alındı"},
        {label : "Gönderim Bekleyenler", value: "Gönderim Bekliyor"},
        {label : "Gönderilenler",  value: "Gönderildi"}]);


    return (
        <Select
            id="deliveryType"
            name="deliveryType"
            label={"Gönderim Durumu"}
            options={data}
            onChange={onChange}
            value={filterObject.deliveryType}
            isClearable={true}
        />
    );
};
export default DeliveryTypeSelect;
