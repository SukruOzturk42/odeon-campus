import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import Select from "../base-component/Select";
import ReferenceDataService from "../../services/ReferenceDataService";
import { Input } from "../base-component/Input";
import InputNumberRange from "../base-component/InputNumberRange";
import InputDateRange from "../base-component/InputDateRange";
import { DatePicker } from "../base-component/DatePicker";
import { InputNumber } from "antd";
import moment from "moment";

const ParameterValue = (props) => {
  const {
    onChange,
    intl,
    value,
    md,
    parameterId,
    operator,
    type,
    error,
  } = props;
  const [data, setData] = useState([]);
  const [isMulti, setIsMulti] = useState(
    operator === "IN" || operator === "NIN" ? true : false
  );
  const [parameter, setParameter] = useState({});

  useEffect(() => {
    setIsMulti(operator === "IN" || operator === "NIN" ? true : false);
    if (type === "campaign") {
      ReferenceDataService.getReferenceTypeByCampaignAttributeId(
        parameterId
      ).then((response) => {
        if (response && response.data && response.data.items) {
          setData(
            response.data.items.map((item) => {
              return { label: item.description, value: item.name };
            })
          );
        }
      });
      ReferenceDataService.getCampaignAttribute(parameterId).then(
        (response) => {
          if (response && response.data) {
            setParameter(response.data);
          }
        }
      );
    } else {
      ReferenceDataService.getReferenceTypeByAttributeId(parameterId).then(
        (response) => {
          response &&
            response.data &&
            response.data.items &&
            setData(
              response.data.items.map((item) => {
                return { label: item.description, value: item.name };
              })
            );
        }
      );
      ReferenceDataService.getAttribute(parameterId).then((response) => {
        if (response && response.data) {
          setParameter(response.data);
        }
      });
    }
  }, [parameterId]);

  const onAreaChangeDate = (event, dateString) => {
    let val = [];
    val[0] = moment(dateString).add(3, 'hours').toISOString();
    onAreaChange({
      id: props.id,
      value: val,
    });
  };

  const onAreaChange = (event) => {
    const { id, value, label } = event;
    if (parameter.dataType === "SELECT") {
      if (isMulti) {
        onChange({ id: "value", value: value });
      } else {
        onChange({ id: "value", value: [value] });
      }
    } else if (parameter.dataType === "INPUT") {
      onChange({ id: "value", value: [value] });
    } else if (parameter.dataType === "DATE") {
      onChange({ id: "value", value: value });
    } else if (parameter.dataType === "INPUT_DECIMAL") {
      if (operator !== "BETWEEN") {
        onChange({ id: "value", value: [value] });
      } else {
        onChange({ id: "value", value: value });
      }
    } else {
      onChange({ id: "value", value: value });
    }
  };

  const selectAllValue = () => {
    let allValue = []
    data.forEach(item => {
      allValue.push(item.value);
    })
    onChange({ id: "value", value: allValue});
  }

  return (
    <>
      {
        {
          INPUT_DECIMAL: (
            <>
              {operator === "BETWEEN" ? (
                <InputNumberRange
                  id={"value"}
                  name="value"
                  label={"Değer"}
                  md={md ? md : 12}
                  onChange={onAreaChange}
                  value={value}
                  min={0}
                  max={150}
                  step={1}
                  error={error}
                />
              ) : (
                <Input
                  id={"value"}
                  name="value"
                  label={"Değer"}
                  md={md ? md : 12}
                  onChange={onAreaChange}
                  value={value}
                  error={error}
                  showInfoBox={true}
                  infoBoxMessage={
                    "Tam Sayı olarak giriş yapınız. Örneğin : 18,21,65"
                  }
                />
              )}
            </>
          ),
          INPUT: (
            <>
              {operator === "BETWEEN" ? (
                <InputNumberRange
                  id={"value"}
                  name="value"
                  label={"Değer"}
                  md={md ? md : 12}
                  onChange={onAreaChange}
                  value={value}
                  min={0}
                  max={1}
                  step={0.01}
                  error={error}
                />
              ) : (
                <Input
                  id={"value"}
                  name="value"
                  label={"Değer"}
                  md={md ? md : 12}
                  onChange={onAreaChange}
                  value={value}
                  error={error}
                  showInfoBox={true}
                  infoBoxMessage={
                    "Ondalıklı Olarak Giriş Yapınız. Örneğin : 0.78,0.45"
                  }
                />
              )}
            </>
          ),
          DATE: (
            <>
              {operator === "BETWEEN" ? (
                <InputDateRange
                  id={"value"}
                  name="value"
                  label={"Değer"}
                  md={md ? md : 12}
                  onChange={onAreaChange}
                  value={value}
                  error={error}
                />
              ) : (
                <DatePicker
                  label={"Tarih"}
                  value={value}
                  onChange={onAreaChangeDate}
                  md={12}
                  format="YYYY-MM-DD HH:mm"
                  rows={4}
                  showTime={{ format: "HH:mm" }}
                  error={props.error}
                />
              )}
            </>
          ),
          SELECT: (
            <Select
              id={"value"}
              name="value"
              label={"Değer"}
              md={md ? md : 12}
              selectAllValue={selectAllValue}
              onChange={onAreaChange}
              isMulti={isMulti}
              options={data}
              value={isMulti ? value : value && value[0]}
              error={error}
              className={"parameter-value"}
            />
          ),
        }[parameter.dataType]
      }
    </>
  );
};
export default ParameterValue;
