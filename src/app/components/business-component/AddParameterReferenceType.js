import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Input } from "../base-component/Input";
import { injectIntl } from "react-intl";
import { SuccessModal } from "../base-component/SuccessModal";

const AddParameterReferenceType = (props) => {
    const {
        intl,
        show,
        setShow,
        handleSubmit,
        showSuccessModal,
        setShowSuccessModal,
        referenceTypeName,
        setReferenceTypeName,
        referenceTypeDesc,
        setReferenceTypeDesc,
        referenceTypeId,
        setReferenceTypeId } = props;

    const [showWarning, setShowWarning] = useState(false);

    const onNameAreaChange = (event) => {
        setReferenceTypeName(event.value);
        setShowWarning(false);
    };
    const onDescAreaChange = (event) => {
        setReferenceTypeDesc(event.value);
        setShowWarning(false);
    };

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
                        Referans Tipi Ekle
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Input
                            id="referenceName"
                            name="referenceName"
                            label={"Referans Adı"}
                            md={12}
                            maxLength={50}
                            value={referenceTypeName}
                            onChange={onNameAreaChange}
                            error={showWarning ? "Gerekli Alanları Doldurunuz." : ""}
                        />
                    </Row>
                    <Row>
                        <Input
                            id="referenceDescription"
                            name="referenceDescription"
                            label={"Referans Açıklaması"}
                            md={12}
                            maxLength={50}
                            value={referenceTypeDesc}
                            onChange={onDescAreaChange}
                            error={showWarning ? "Gerekli Alanları Doldurunuz." : ""}
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
                                if (referenceTypeId == null) {
                                    handleSubmit({
                                        name: referenceTypeName,
                                        description: referenceTypeDesc
                                    }, "Referans Tipi")
                                    setReferenceTypeName("");
                                    setReferenceTypeDesc("");
                                }
                                else {
                                    handleSubmit({
                                        id: referenceTypeId,
                                        name: referenceTypeName,
                                        description: referenceTypeDesc
                                    }, "Referans Tipi")
                                    setReferenceTypeId(null);
                                    setReferenceTypeName("");
                                    setReferenceTypeDesc("");
                                }
                                setShow(false);
                            }}
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
                                setReferenceTypeId(null);
                                setReferenceTypeName("");
                                setReferenceTypeDesc("");
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
export default injectIntl(AddParameterReferenceType);
