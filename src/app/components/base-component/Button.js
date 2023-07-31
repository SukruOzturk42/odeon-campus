import React, { useEffect, useState } from "react";
import { Button as BootstrapButton, Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { removeProperty } from "../../common/utils/Util";
import { injectIntl } from "react-intl";

export const Button = (props) => {
  const authToken = useSelector((state) => state.auth.authToken);
  const [disabled, setDisabled] = useState();

  const _md = props.md ? props.md : "12";

  let className = props.action && " mb-0 ";

  const newProps = removeProperty(props, "disabled");

  return (
    <Form.Group
      className={className}
      as={Col}
      md={
        props.offset
          ? { size: _md, offset: props.offset ? props.offset : 0 }
          : _md
      }
    >
      <Form.Label>{!props.action && "\u00a0"}</Form.Label>
      <div {...(props.showInfoBox && { data_tip: props.infoBoxMessage })}>
      <BootstrapButton
        disabled={props.disabled}
        type={props.type}
        variant={props.variant ? props.variant : "primary"}
        className="col-md-12"
        {...newProps}
      >
        {props.children ? props.children : props.text}
      </BootstrapButton>
      </div>
    </Form.Group>
  );
};

export default injectIntl(Button);
