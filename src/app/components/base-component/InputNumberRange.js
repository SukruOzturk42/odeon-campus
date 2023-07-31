import React, { useEffect, useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { InputNumber } from "antd";

export const InputNumberRange = (props) => {
  const { value } = props;

  const [inputDecimalValue, setInputDecimalValue] = useState(
    value ? value : [0, 0]
  );
  const isInputNumber = (e) => {
    if (props.mode !== undefined && props.mode === "number") {
      let char = String.fromCharCode(e.which);
      if (!/[0-9]/.test(char)) {
        return false;
      }
    } else if (props.mode !== undefined && props.mode === "name") {
      let char = String.fromCharCode(e.which);
      if (!/[a-zA-Z]/.test(char)) {
        return false;
      }
    } else if (props.mode !== undefined && props.mode === "email") {
      let char = String.fromCharCode(e.which);
      if (!/[a-zA-z0-9!#$%&'*+\-/=?^_´{|}~.(),:;<>@"]/.test(char)) {
        e.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (!value) {
      let val = [];
      props.onChange({
        id: props.id,
        value: inputDecimalValue,
      });
    }
  }, []);

  useEffect(() => {
    if (!value) {
      setInputDecimalValue((oldArray) => [...oldArray, value]);
    }
  }, [value]);

  useEffect(() => {
    props.onChange({
      id: props.id,
      value: inputDecimalValue,
    });
  }, [inputDecimalValue]);

  const inputChangeHandle = (e) => {
    let tempArray = [0, 0];
    tempArray[0] = e;
    tempArray[1] = inputDecimalValue[1];
    setInputDecimalValue(tempArray);
  };

  const inputEndChangeHandle = (e) => {
    let tempArray = [0, 0];
    tempArray[0] = inputDecimalValue[0];
    tempArray[1] = e;
    setInputDecimalValue(tempArray);
  };

  return (
    <Form.Group
      as={Col}
      md={props.md ? props.md : "12"}
      lg={props.lg}
      id={props.id}
    >
      <Row>
        <Form.Label className={props.labelClassName}>{"Başlangıç"}</Form.Label>
        <InputNumber
          min={props.min}
          max={props.max}
          style={{ margin: "0 16px" }}
          step={props.step}
          style={{ margin: "0 16px" }}
          onKeyPress={isInputNumber}
          value={value ? value[0] : inputDecimalValue[0]}
          onChange={inputChangeHandle}
        />
      </Row>
      <Row>
        <Form.Label className={props.labelClassName}>{"Bitiş"}</Form.Label>
        <InputNumber
          min={props.min}
          max={props.max}
          style={{ margin: "0 16px" }}
          step={props.step}
          onKeyPress={isInputNumber}
          value={value ? value[1] : inputDecimalValue[1]}
          onChange={inputEndChangeHandle}
        />
      </Row>
      <Form.Control.Feedback type="invalid">
        {props.error ? props.error : ""}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default injectIntl(InputNumberRange);
