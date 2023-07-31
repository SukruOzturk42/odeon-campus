import React from "react";
import { Form, Col } from "react-bootstrap";
import { injectIntl } from "react-intl";

export const TextArea = (props) => {
    const isInputNumber = (e) => {
        if (props.mode !== undefined && props.mode === "number") {
            let char = String.fromCharCode(e.which);
            if (!/[0-9]/.test(char)) {
                e.preventDefault();
            }
        } else if (props.mode !== undefined && props.mode === "name") {
            let char = String.fromCharCode(e.which);
            if (!/[a-zA-Z]/.test(char)) {
                e.preventDefault();
            }
        } else if (props.mode !== undefined && props.mode === "email") {
            let char = String.fromCharCode(e.which);
            if (!/[a-zA-z0-9!#$%&'*+\-/=?^_´{|}~.(),:;<>@"]/.test(char)) {
                e.preventDefault();
            }
        }
    };

    const inputChangeHandle = (e) => {
        props.onChange({
            id: e.target.id,
            value: e.target.value,
        });
    };

    return (
        <Form.Group
            as={Col}
            md={props.md ? props.md : "12"}
            lg={props.lg}
            id={props.id}
        >
            <Form.Label className={props.labelClassName}>{props.label}</Form.Label>
            <Form.Control
                {...props}
                value={props.value !== undefined ? props.value : ""}
                onChange={inputChangeHandle}
                isInvalid={props.error}
                onKeyPress={isInputNumber}
                rows={props.rows}
                as={props.as}
            />
            <Form.Control.Feedback type="invalid">
                {props.error ? props.error : ""}
            </Form.Control.Feedback>
        </Form.Group>
    );
};

export default injectIntl(TextArea);
