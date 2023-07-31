import React, { useState, useEffect } from 'react'
import * as TaskService from '../../services/TaskService'
import Select from '../base-component/Select';

export default function TaskAgencySelect(props) {

    const { onChange, value, md, error, setAgencyCodes, temp } = props;
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        getAgencies();
    }, []);

    const getAgencies = () => {
        TaskService.getRoleTaskAgencies().then(response => {
            response &&
                setAgencies(response.data.items)
            response &&
                onChange({
                    id: "agencyCodes",
                    value: [response.data.items[0]],
                })
            response.data.items &&
                setAgencyCodes(temp.length > 0 ? temp : [response.data.items[0]])
        })
    }

    const selectAllValue = () => {
        let allValue = []
        agencies.map((item) => {
            return { label: item, value: item };
        }).forEach(item => {
            allValue.push(item.value);
        })
        setAgencyCodes(allValue);
    }

    return (
        <div>
            <Select
                id="agencyCodes"
                name="agencyCodes"
                label={"Acente Tipi"}
                md={md ? md : 12}
                onChange={onChange}
                isClearable={true}
                isMulti={true}
                options={Array.isArray(agencies) ? agencies.map((item) => {
                    return { label: item, value: item };
                }) : []}
                selectAllValue={selectAllValue}
                value={value}
                error={error}
            />
        </div>
    )
}
