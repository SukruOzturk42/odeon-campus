import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import { injectIntl } from "react-intl";
import { Form, Col } from "react-bootstrap";

const TagInput = (props) => {
  const { intl } = props;
  const components = {
    DropdownIndicator: null,
  };

  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(props.value);

  const errorColor = "#F64E60";
  const createOption = (label) => ({
    label,
    value: label,
  });
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

  useEffect(() => {
    props.value &&
      setValue(
        props.value.map((item) => {
          return { value: item, label: item };
        })
      );
  }, [props.value]);
  const handleKeyDown = (event) => {
    if (!inputValue) {
      return;
    }
    switch (event.key) {
      case "Enter":
      case "Tab":
        const val = value ? value : [];
        if(val.length <props.tagSize){
          setValue([...val, createOption(inputValue)]);
          const tags = [...val, createOption(inputValue)];
          props.onChange({ id: "tags", value: tags.map((item) => item.value) });
          setInputValue("");
          event.preventDefault();
        }
        break;
      default:
        break;
    }
  };
  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };
  const handleChange = (value) => {
    setValue(value ? value : []);
    props.onChange({
      id: "tags",
      value: value ? value.map((item) => item.value) : [],
    });
  };
  return (
    <Form.Group
      as={Col}
      md={props.md ? props.md : "12"}
      lg={props.lg}
      controlId={props.id}
    >
      <Form.Label>{props.label}</Form.Label>

      <CreatableSelect
        id={props.id}
        name={props.name}
        styles={customStyles}
        components={components}
        inputValue={inputValue}
        placeholder={intl.formatMessage({
          id: "COMPONENT.TAGINPUT.DEFAULT.PLACEHOLDER",
        })}
        isClearable
        isMulti
        menuIsOpen={false}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onInputChange={handleInputChange}
        value={value}
        tagSize = {props.tagSize}
      />
      <Form.Control isInvalid={props.error} hidden />
      <Form.Control.Feedback type="invalid">
        {props.error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
export default injectIntl(TagInput);
