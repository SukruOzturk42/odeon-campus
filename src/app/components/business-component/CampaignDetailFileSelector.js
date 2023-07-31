import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAuthType } from "../../services/TokenService";
import { removeProperty } from "../../common/utils/Util";

export const FileSelector = (props) => {
  const authToken = useSelector((state) => state.auth.authToken);
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState();
  

  useEffect(() => {
    if (props.disabled) {
      setDisabled(props.disabled);
    } else {
      setDisabled(false);
    }
    if (props.isEnabledViewType) {
      const authType = getAuthType(authToken);
      if (authType === "VIEWING") {
        setDisabled(true);
      } else {
        setDisabled(props.disabled);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isEnabledViewType, props.disabled]);

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
      <Form.File
        className="position-relative"
        disabled={props.disabled ? props.disabled : false}
        name="file"
        label={props.text}
        {...newProps}
        key={props.key}
        onChange={props.onChange}
        onClick={props.onClick}
        accept={
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      />
    </Form.Group>
  );
};
