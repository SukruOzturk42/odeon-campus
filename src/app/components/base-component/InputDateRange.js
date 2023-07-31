import React, { useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { InputNumber } from "antd";
import {DatePicker} from "./DatePicker";
import moment from "moment";

export const Input = (props) => {
  const { value } = props;


  useEffect(() => {
    if (!value) {
      let val = [];
      val[0] = null;
      val[1] = null;
      props.onChange({
        id: props.id,
        value: val,
      });
    }
  }, []);

  const onAreaChangeStartDate = (event,dateString) => {
    value[0] =  formatDate(dateString)
      props.onChange({
        id: props.id,
        value: value,
      });
  };
  const onAreaChangeEndDate = (event,dateString) => {
    value[1] = formatDate(dateString)
    props.onChange({
        id: props.id,
        value: value,
      });
  };

    const formatDate = (dateString) => {
        const date = moment(
            dateString
        )
        return moment(date.format("YYYY-MM-DDTHH:mm:ss.SSSSZ")).add(3, 'hours')
            .toISOString();
    }

  return (
      <>
      <Row>
        <DatePicker
            label={"Başlangıç Tarihi"}
            value={props.value ? props.value[0] : null}
            onChange={onAreaChangeStartDate}
            md={12}
            format="YYYY-MM-DD HH:mm"
            rows={4}
            error={props.error}
            showTime={{ format: "HH:mm" }}
        />
      </Row>
      <Row>
        <DatePicker
            label={"Bitiş Tarihi"}
            value={props.value ? props.value[1] : null}
            onChange={onAreaChangeEndDate}
            md={12}
            format="YYYY-MM-DD HH:mm"
            rows={4}
            error={props.error}
            showTime={{ format: "HH:mm" }}
        />
      </Row>
      </>
  );
};

export default injectIntl(Input);
