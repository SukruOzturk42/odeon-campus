import React, { useState, useEffect } from 'react'
import * as TaskService from '../../services/TaskService'
import { Modal, Row } from 'react-bootstrap';
import { SuccessModal } from '../base-component/SuccessModal';
import Select from '../base-component/Select';
import { injectIntl } from "react-intl";

const AddTaskOwnerModal = (props) => {

    const {
        intl,
        agencyNo,
        show,
        setShow,
        onChange,
        value,
        showSuccessModal,
        setShowSuccessModal,
        onClick
    } = props;

    const [data, setData] = useState([]);

    useEffect(() => {
        getUsersByAgencyCode(agencyNo)
    }, []);

    const getUsersByAgencyCode = (agencyNo) => {
        TaskService.getUsersByAgencyCode(agencyNo).then(response => {
            response &&
                setData(response.data.items)
        })
    }

    const taskOwnerChangeHandler = (event) => {
        const { id, value, label } = event;
        onChange({
            id: id,
            value: label,
        })
        onChange({
            id: "taskOwnerUserName",
            value: value
        })
    }

    return (
        <div>
            <div>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    key={props.show}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Sorumlu Kişi Ata
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Select
                                id={"taskOwnerName"}
                                name={"taskOwnerName"}
                                label={"Sorumlu Kişi"}
                                md={8}
                                onChange={taskOwnerChangeHandler}
                                options={Array.isArray(data) ? data.map((item) => {
                                    return { label: item.fullName, value: item.username };
                                }) : []}
                                value={value}
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
                                    onClick();
                                    setShowSuccessModal(true);
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
        </div>
    )
}

export default injectIntl(AddTaskOwnerModal);