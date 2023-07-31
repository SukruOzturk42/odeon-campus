import React, {useState} from 'react'
import Select from '../base-component/Select';

const PolicyCodesSelect = (props) => {
    const { onChange, value, md, error } = props;
    const [data, setData] = useState([
        { label: "101-Poliçe 1", value: "101-Poliçe 1" },
        { label: "202-Poliçe 2", value: "202-Poliçe 2" },
        { label: "303-Poliçe 3", value: "303-Poliçe 3" },
        { label: "404-Poliçe 4", value: "404-Poliçe 4" },
        { label: "505-Poliçe 5", value: "505-Poliçe 5" },
        { label: "606-Poliçe 6", value: "606-Poliçe 6" }
      ]);

      const selectAllValue = () => {
        let allValue = []
        data.forEach(item => {
          allValue.push(item.value);
        })
        props.setTask((state) => ({ ...state, policyNumbers: allValue }));
      }

    return (
        <div>
            <Select
                md={5}
                id="policyNumbers"
                name="policyNumbers"
                label={"Poliçe Kodları"}
                options={data}
                selectAllValue={selectAllValue}
                onChange={onChange}
                isMulti={true}
                error={error}
                value={value}
                isClearable={true}
            />
        </div>
    )
}
export default PolicyCodesSelect;