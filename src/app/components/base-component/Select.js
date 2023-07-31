import React from "react";
import ReactSelect from "react-select";
import { injectIntl } from "react-intl";
import { Form, Col } from "react-bootstrap";
import { customSelectOptionFilter as filterOption } from "../../common/utils/Util";

const Select = (props) => {
  const { intl } = props;
  const { onChange } = props;
  const handleSelectChange = (val, event) => {
    if (Array.isArray(val)) {
      onChange({
        id: event.name,
        label: val.map((item) => item.label),
        value: val.map((item) => item.value),
      });
    } else {
      onChange({
        id: event.name,
        label: val && val.label,
        value: val && val.value,
      });
    }
  };
  const errorColor = "#F64E60";

  const customStyles = {
    control: (styles) => ({
      ...styles,
      ...(props.error && {
        borderColor: errorColor,
        boxShadow: "none",
        "&:hover": {
          borderColor: errorColor,
        },
      }),
    }),
  };

  const checkSort = (flag) => {
    if (flag !== undefined && flag !== null) {
      return flag;
    } else {
      return true;
    }
  };

  const getValue = () => {
    return props.value
      ? props.isMulti
        ? props.options.filter(({ value }) =>
            props.value ? props.value.findIndex((i) => i === value) > -1 : null
          )
        : props.options.find((item) => item.value === props.value)
      : null;
  };

  const getTitleDescription = () => {
    const value = getValue();
    return value
      ? props.isMulti
        ? value.map((item) => item.label)
        : value.label
      : "";
  };

  return (
    <Form.Group
      as={Col}
      md={props.md ? props.md : "12"}
      lg={props.lg}
      controlId={props.id}
    >
      <Form.Label>{props.label}</Form.Label>
      {props.isMulti && <div className={"float-right cursor-pointer"} onClick={props.selectAllValue}>Hepsini seç</div>}
      <div title={getTitleDescription()} {...(props.showInfoBox && { data_tip: props.infoBoxMessage })}>
        <ReactSelect
          styles={customStyles}
          id={props.id}
          name={props.id}
          options={
            Array.isArray(props.options) && checkSort(props.sort)
              ? props.options.sort(
                  (a, b) =>
                    a.label &&
                    a.label
                      .toString()
                      .localeCompare(b.label && b.label.toString())
                )
              : props.options
          }
          placeholder={intl.formatMessage({
            id: "COMPONENT.SELECT.DEFAULT.PLACEHOLDER",
          })}
          defaultValue={props.defaultValue}
          onChange={handleSelectChange}
          onMenuOpen={props.onMenuOpen}
          error={props.error}
          value={getValue()}
          onBlur={props.onBlur}
          isDisabled={props.isDisabled}
          autoFocus={false}
          className= {props.className ? props.className : ""}
          ignoreCase={true}
          isClearable={
            props.isClearable !== undefined ? props.isClearable : true
          }
          noOptionsMessage={() => "Veri yok"}
          filterOption={filterOption}
          isMulti={props.isMulti}
        />
      </div>
      <Form.Control isInvalid={props.error} hidden />
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default injectIntl(Select);
