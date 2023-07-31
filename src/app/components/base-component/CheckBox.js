import React from "react";
import { Col, Form, InputGroup } from "react-bootstrap";

export function Checkbox({
  checked,
  onChange,
  onClick,
  children,
  id,
  name,
  disabled,
  label,
  md,
  lg,
  labelClassName,
  error,
}) {
  const getCheckBox = () => {
    const inputChangeHandle = (e) => {
      onChange({
        id: e.target.id,
        value: e.target.checked,
      });
    };
    return (
      <>
        <input type="checkbox" style={{ display: "none" }} />
        <label className="checkbox checkbox-lg checkbox-single">
          <input
            disabled={disabled}
            name={name}
            id={id}
            type="checkbox"
            checked={checked}
            onChange={inputChangeHandle}
            onClick={onClick}
          />
          {children}
          <span />
        </label>
      </>
    );
  };

  return (
    <>
      {label ? (
        <Form.Group as={Col} md={md ? md : "12"} lg={lg} id={id}>
          <Form.Label className={labelClassName}>{label}</Form.Label>
          <InputGroup className={"mt-2"}>{getCheckBox()}</InputGroup>
          <Form.Control.Feedback type="invalid">
            <span>{error}</span>
          </Form.Control.Feedback>
        </Form.Group>
      ) : (
        getCheckBox()
      )}
    </>
  );
}
