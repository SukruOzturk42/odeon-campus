import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import {Col, Row} from "react-bootstrap";
import moment from "moment";

const DetailModal = (props) => {
    const { intl,data } = props;
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

    const formatDetailDate = (date) => {
        return moment(date).format("DD-MM-YYYY - HH:mm");
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
                {data.length > 0 &&
                data.map(detail => {
                return(<>
                    <Row  className={"mt-1"}>
                        <Col md={1}>
                            <i className="flaticon-calendar-with-a-clock-time-tools"></i>

                        </Col>
                        <Col md={8}>
                            {detail.description + ' by ' + detail.updater + ' ' }
                        </Col>
                        <Col md={3}>
                            {formatDetailDate(detail.createdAt)}
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
export default injectIntl(DetailModal);
