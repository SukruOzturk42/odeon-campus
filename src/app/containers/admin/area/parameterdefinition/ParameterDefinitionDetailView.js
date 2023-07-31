import React, { useState, useContext } from 'react'
import { Datatable } from '../../../../components/base-component/Datatable'
import { Col, Row } from "react-bootstrap";
import Select from '../../../../components/base-component/Select';
import { textFilter } from "react-bootstrap-table2-filter";
import { Tooltip, Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import AddParameterReferenceType from '../../../../components/business-component/AddParameterReferenceType';
import AddParameterOperatorType from '../../../../components/business-component/AddParameterOperatorType';

export default function ParameterDefinitionDetailView(props) {

    const {
        operators,
        references,
        removeButton,
        parameter,
        updateButton,
        handleSubmit,
        showSuccessModal,
        setShowSuccessModal,
        referenceTypeName,
        setReferenceTypeName,
        referenceTypeDesc,
        setReferenceTypeDesc,
        referenceTypeId,
        setReferenceTypeId,
        showModal,
        setShowModal,
        operatorTypeName,
        operatorTypeNames,
        operatorTypeId,
        setOperatorTypeName,
        setOperatorTypeNames,
        setOperatorTypeId,
        showOperatorModal,
        setShowOperatorModal,
        removeOperatorButton,
        updateOperatorButton,
        updateOperator } = props;

    const [data, setData] = useState([
        { label: "Operatör Tipleri", value: "Operatör Tipi" },
        { label: "Referans Tipleri", value: "Referans Tipi" }
    ]);
    const [selectionType, setSelectionType] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    

    const onChange = (event) => {
        const { id, value, label } = event;
        setSelectionType("");
        if (id === "selectionType" && (value === "Operatör Tipi" || label === "Operatör Tipleri")) {
            setSelectionType("Operatör Tipi");

        }
        else {
            setSelectionType("Referans Tipi")
        }
    }

    const parameterDefinitionOperatorColumns = [
        {
            dataField: "id",
            text: "Operatör Id",
            sort: true,
            hidden: true
        },
        {
            dataField: "name",
            text: "Operatör Adı",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "operatorEnum",
            text: "Operatör Tipi",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "action1",
            text: "Sil",
            editable: false,
            formatter: removeOperatorButton,
        },
        {
            dataField: "action2",
            text: "Düzenle",
            editable: false,
            formatter: updateOperatorButton,
        },
    ];

    const parameterDefinitionReferenceColumns = [
        {
            dataField: "id",
            text: "Referenece Id",
            sort: true,
            hidden: true
        },
        {
            dataField: "name",
            text: "Referans Adı",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "description",
            text: "Açıklama",
            sort: true,
            filter: textFilter({ placeholder: ' ' })
        },
        {
            dataField: "action1",
            text: "Sil",
            editable: false,
            formatter: removeButton,
        },
        {
            dataField: "action2",
            text: "Düzenle",
            editable: false,
            formatter: updateButton,
        },
    ];

    return (
        <div>
            <>
                <div className={"reward-detail-card"}>
                    <Row>
                        <Col md={12} className={"reward-detail-column"}>
                            <span>Parametre Id : </span> <span className={"reward-information"}>{parameter.id}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className={"reward-detail-column"}>
                            <span>Parametre Adı :</span> <span className={"reward-information"}>{parameter.name}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} className={"reward-detail-column"}>
                            <span>Açıklama :</span> <span className={"reward-information"}>{parameter.description}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} className={"reward-detail-column reward-detail-bottom"}>
                            <span> Data Tipi :</span> <span className={"reward-information"}>{parameter.operator}</span>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <Col>
                        <Select
                            md={3}
                            id="selectionType"
                            name="selectionType"
                            label={"Seçim Tipi"}
                            options={data}
                            onChange={onChange}
                            value={data}
                            isClearable={true}
                        />
                    </Col>
                    {selectionType === "Operatör Tipi" &&
                        (<Row>
                            <Col>
                                <span>{"Operatör Tipi Ekle :"} </span>
                            </Col>
                            <Col>
                                <Tooltip title={"Ekle"} placement={"top-start"}>
                                    <Fab
                                        size="small"
                                        color={"primary"}
                                        aria-label="History"
                                        onClick={() => {
                                            setShowOperatorModal(true)
                                            // setWarningShowModal(true);
                                            // setWarningModalBody("Mesajı silmek istediğinize emin misiniz?");
                                            // setRowId(row.id);
                                        }}
                                    >
                                        <Add></Add>
                                    </Fab>
                                </Tooltip>
                            </Col>
                        </Row>)}
                    {selectionType === "Referans Tipi" &&
                        (<Row>
                            <Col>
                                <span>{"Referans Tipi Ekle :"} </span>
                            </Col>
                            <Col>
                                <Tooltip title={"Ekle"} placement={"top-start"}>
                                    <Fab
                                        size="small"
                                        color={"primary"}
                                        aria-label="History"
                                        onClick={() => {
                                            setShowModal(true)
                                            // setWarningShowModal(true);
                                            // setWarningModalBody("Mesajı silmek istediğinize emin misiniz?");
                                            // setRowId(row.id);
                                        }}
                                    >
                                        <Add></Add>
                                    </Fab>
                                </Tooltip>
                            </Col>
                        </Row>)}
                </Row>
                {selectionType === "Operatör Tipi" &&
                    (<Row>
                        <Datatable
                            data={operators ? operators : []}
                            columns={parameterDefinitionOperatorColumns}
                            keyfield={"id"}
                            hidePagination={false}
                            sizePerPage={15}
                        />
                    </Row>)
                }
                {selectionType === "Referans Tipi" &&
                    (<Row>
                        <Datatable
                            data={references ? references : []}
                            columns={parameterDefinitionReferenceColumns}
                            keyfield={"id"}
                            hidePagination={false}
                            sizePerPage={15}
                        />
                    </Row>)
                }
                <AddParameterReferenceType
                    show={showModal}
                    setShow={setShowModal}
                    handleSubmit={handleSubmit}
                    showSuccessModal={showSuccessModal}
                    setShowSuccessModal={setShowSuccessModal}
                    referenceTypeName={referenceTypeName}
                    setReferenceTypeName={setReferenceTypeName}
                    referenceTypeDesc={referenceTypeDesc}
                    setReferenceTypeDesc={setReferenceTypeDesc}
                    referenceTypeId={referenceTypeId}
                    setReferenceTypeId={setReferenceTypeId}
                />
                <AddParameterOperatorType
                    show={showOperatorModal}
                    setShow={setShowOperatorModal}
                    handleSubmit={handleSubmit}
                    showSuccessModal={showSuccessModal}
                    setShowSuccessModal={setShowSuccessModal}
                    operatorTypeName={operatorTypeName}
                    operatorTypeNames={operatorTypeNames}
                    setOperatorTypeName={setOperatorTypeName}
                    setOperatorTypeNames={setOperatorTypeNames}
                    operatorTypeId={operatorTypeId}
                    setOperatorTypeId={setOperatorTypeId}
                    updateOperator={updateOperator}
                />
            </>
        </div >
    )
}
