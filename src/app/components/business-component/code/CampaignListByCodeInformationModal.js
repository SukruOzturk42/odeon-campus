import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import moment from "moment";


const CampaignListByCodeInformationModal = (props) => {
    const { intl, data, codeGroupId, codeGroupName } = props;
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

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="example-modal-sizes-title-lg"
            key={show}
        >
            <Modal.Header closeButton>
                <button
                    type="button"
                    onClick={onHide}
                    className="btn btn-light btn-elevate"
                >X</button>
                    {codeGroupId}
                    {" - "}
                    {codeGroupName}
            </Modal.Header>
            <Modal.Body>
                <Row className={"mt-1"} style={{fontWeight: "bold"}}>
                    <Col md={3}>
                        Kampanya ID
                    </Col>
                    <Col md={1} />
                    <Col md={2}>
                        Versiyon
                    </Col>
                    <Col md={1} />
                    <Col md={5}>
                        Kampanya İsmi
                    </Col>
                </Row>
                {data.length > 0 &&
                data.map(code => {
                return(<>
                    <Row  className={"mt-1"}>
                        <Col md={3}>
                            {code.campaignId}
                        </Col>
                        <Col md={1} />
                        <Col md={2}>
                            {code.campaignVersion}
                        </Col>
                        <Col md={1} />
                        <Col md={5}>
                            {code.campaignName}
                        </Col>
                    </Row>
                    <div></div>
                </>)
                })}
                {data.length === 0 &&
                    <>
                        <div>Kayıt Bulunmamaktadır.</div>
                    </>
                }
            </Modal.Body>

        </Modal>
    );
};
export default injectIntl(CampaignListByCodeInformationModal);
