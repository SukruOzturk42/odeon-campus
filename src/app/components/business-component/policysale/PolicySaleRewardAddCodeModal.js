import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import FileImport from "../FileImport";
import { Button } from "../../base-component/Button";
import * as PolicySaleGiftCodeService from "../../../services/PolicySaleGiftCodeService";
import * as ObjectUtils from "../../../common/utils/ObjectUtils";
import { SuccessModal } from "../../base-component/SuccessModal";

const PolicySaleRewardAddCodeModal = (props) => {
    const { intl, code, setCode } = props;
    const [show, setShow] = useState(props.show);
    const [showWarning, setShowWarning] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

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
        if (ObjectUtils.isNonUndefinedOrNonNull(code.campaignFile)) {
            PolicySaleGiftCodeService.savePolicySaleGiftCodeInformation(code).then(response => {
                response && response.data && setCode(response.data);
                setShowSuccessModal(true);
            })
        } else {
            setShowWarning(true);
        }
    }

    const onChange = (event) => {
        const { id, value } = event;
        setCode((state) => ({ ...state, [id]: value }));
        setShowWarning(false);
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
                        error={showWarning ? "Kod Excelini Giriniz." : ""}
                    />
                    <Button
                        text={"Kaydet"}
                        md={6}
                        onClick={uploadCode}
                    />
                </Row>
            </Modal.Body>
            <SuccessModal 
                show={showSuccessModal}
                setShow={setShowSuccessModal}
            />
        </Modal>
    );
};
export default injectIntl(PolicySaleRewardAddCodeModal);
