import React from "react";
import { Form, Col } from "react-bootstrap";

export const Radio = (props) => {
  return (
    <Form.Group
      as={Col}
      md={props.md ? props.md : "12"}
      lg={props.lg}
      id={props.id}
    >
      <Col md={props.md ? props.md : "12"}>
        <Form.Check
          type="radio"
          label={props.label}
          name={props.name}
          id={props.id}
          onChange={props.onChange}
          checked={props.checked}
          onClick={props.onClick}
        />
      </Col>
    </Form.Group>
  );
};
