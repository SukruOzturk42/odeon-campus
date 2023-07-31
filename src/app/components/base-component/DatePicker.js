import React from "react";
import { Col, Form } from "react-bootstrap";
import { DatePicker as DP } from "antd";
import locale from "antd/es/date-picker/locale/tr_TR";
import * as moment from "moment";
moment.locale("tr");

export const DatePicker = (props) => {
  const style = {
    minWidth: "100%",
    width: "100%",
  };
  const dateFormat = props.showTime ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY";
  let className = props.error ? "date-picker-error" : "";
  return (
    <Form.Group
      as={Col}
      md={props.md ? props.md : "12"}
      lg={props.lg}
      controlId={props.id}
    >
      <Form.Label>{props.label}</Form.Label>
      <br />
      <DP
        showTime={props.showtime}
        className={className}
        {...props}
        locale={locale}
        format={props.format ? props.format : dateFormat}
        onChange={(date, dateString) => props.onChange(date, dateString)}
        style={style}
        value={props.value ? moment(props.value, "YYYY-MM-DD HH:mm:ss") : null}
      />
      <Form.Control isInvalid={props.error} hidden />
      <Form.Control.Feedback type="invalid">
        {props.error ? props.error : ""}
      </Form.Control.Feedback>
    </Form.Group>
  );
};
