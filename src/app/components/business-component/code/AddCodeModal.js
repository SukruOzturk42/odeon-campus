import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import FileImport from "../FileImport";
import { Button } from "../../base-component/Button";
import * as CodeUploadService from "../../../services/CodeUploadService";

const AddCodeModal = (props) => {
    const { intl, code, setCode } = props;
    const [show, setShow] = useState(props.show);

    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    const onHide = () => {
        props.setShow(false);
        setShow(false);
    };

    useEffect(() => {
        if (props.show) {
            setShow(true);
        } else {
            onHide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.show]);

    const uploadCode = () => {
        CodeUploadService.saveGiftCodeInformation(code).then(response => {
            response && response.data && setCode(response.data);
            alert("Kod Kümesine Ekleme Başarıyla Yapıldı.");
          })
    }

    const onChange = (event) => {
        const { id, value } = event;
        setCode((state) => ({ ...state, [id]: value }));
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
            key={show}
            className={"detail-modal"}
        >
            <Modal.Header closeButton>
                <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >X</button>
            </Modal.Header>
            <Modal.Body>
                <Row className={"mt-1"}>
                    <FileImport
                        id={"campaignFile"}
                        text={"Dosya Yükle"}
                        md={6}
                        type={"file"}
                        onChange={onChange}
                    />
                    <Button
                        text={"Kaydet"}
                        md={6}
                        onClick={uploadCode}
                    />
                </Row>
            </Modal.Body>

        </Modal>
    );
};
export default injectIntl(AddCodeModal);
