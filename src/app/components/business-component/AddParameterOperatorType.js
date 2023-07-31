import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { injectIntl } from "react-intl";
import { SuccessModal } from "../base-component/SuccessModal";
import Select from "../base-component/Select";

const AddParameterOperatorType = (props) => {
    const {
        intl,
        show,
        setShow,
        handleSubmit,
        updateOperator,
        showSuccessModal,
        setShowSuccessModal,
        operatorTypeNames,
        setOperatorTypeNames,
        operatorTypeId,
        setOperatorTypeId,
    } = props;

    const OPERATOR_TYPE = [
        { label: "EQ", value: "EQ" },
        { label: "AGE", value: "AGE" },
        { label: "NEQ", value: "NEQ" },
        { label: "IN", value: "IN" },
        { label: "NIN", value: "NIN" },
        { label: "GT", value: "GT" },
        { label: "GTE", value: "GTE" },
        { label: "LT", value: "LT" },
        { label: "LTE", value: "LTE" },
        { label: "BETWEEN", value: "BETWEEN" },
        { label: "BETWEEN_DATE", value: "BETWEEN_DATE" },
        { label: "EQ_BIRTH_DATE", value: "EQ_BIRTH_DATE" },
        { label: "NEQ_BIRTH_DATE", value: "NEQ_BIRTH_DATE" },
        { label: "INLIST", value: "INLIST" },
    ];

    const operatorNamesOnAreaChange = (event) => {
        setOperatorTypeNames(event.value);
    };

    const selectAllValue = () => {
        let allValue = []
        OPERATOR_TYPE.forEach(item => {
            allValue.push(item.value);
        })
        setOperatorTypeNames(allValue);
    }

    return (
        <div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                key={props.show}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Operatör Tipi Ekle
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Select
                            id={"operatorName"}
                            name={"operatorName"}
                            label={"Operatör Adı"}
                            md={12}
                            onChange={operatorNamesOnAreaChange}
                            isMulti={true}
                            selectAllValue={selectAllValue}
                            options={OPERATOR_TYPE}
                            value={operatorTypeNames}
                        />
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button
                            type="submit"
                            form="form2"
                            className="btn btn-primary btn-elevate"
                            onClick={() => {
                                if (operatorTypeId !== null) {
                                    if (operatorTypeNames.length <= 1)
                                        updateOperator(operatorTypeNames[0], operatorTypeId);
                                    else {
                                        alert("Birden fazla tip seçtiniz. Lütfen sadece değiştirmek istediğiniz tipi seçiniz.")
                                        setOperatorTypeNames([]);
                                        setOperatorTypeId(null);
                                    }
                                }
                                else {
                                    handleSubmit({
                                        names: [operatorTypeNames]
                                    })
                                }
                                setShow(false);
                            }
                            }
                        >
                            {props.onOkText
                                ? props.onOkText
                                : intl.formatMessage({
                                    id: "SAVE",
                                })}
                        </button>
                        <> </>
                        <button
                            type="button"
                            onClick={() => {
                                setShow(false)
                                setOperatorTypeNames([]);
                                setOperatorTypeId(null);
                            }}
                            className="btn btn-light btn-elevate"
                        >
                            {props.onHideText
                                ? props.onHideText
                                : intl.formatMessage({
                                    id: "BACK.TO.THE.PAGE",
                                })}
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>
            <SuccessModal
                show={showSuccessModal}
                setShow={setShowSuccessModal}
            />
        </div>
    );
};
export default injectIntl(AddParameterOperatorType);
