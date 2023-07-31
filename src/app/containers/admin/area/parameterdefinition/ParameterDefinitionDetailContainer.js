import React, { useState, useContext, useEffect } from 'react'
import { GlobalContext } from '../../../../context/GlobalState';
import * as AdminService from "../../../../services/AdminService"
import ParameterDefinitionDetailView from './ParameterDefinitionDetailView';
import { Tooltip, Fab } from "@material-ui/core";
import { Add, Delete, Update } from "@material-ui/icons";
import ConfirmModal from '../../../../components/base-component/ConfirmModal';

export default function ParameterDefinitionDetailContainer() {

    const { activeSubMenu, setActiveSubMenu } = useContext(GlobalContext);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [referenceTypeName, setReferenceTypeName] = useState("");
    const [operatorTypeName, setOperatorTypeName] = useState("");
    const [operatorTypeNames, setOperatorTypeNames] = useState([]);
    const [referenceTypeDesc, setReferenceTypeDesc] = useState("");
    const [referenceTypeId, setReferenceTypeId] = useState(null);
    const [operatorTypeId, setOperatorTypeId] = useState(null);
    const [warningModalBody, setWarningModalBody] = useState(false);
    const [showWarningModal, setWarningShowModal] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showOperatorModal, setShowOperatorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [operators, setOperators] = useState([]);
    const [references, setReferences] = useState([]);
    const [parameter, setParameter] = useState({
        id: activeSubMenu.parameterId,
        name: activeSubMenu.parameterName,
        description: activeSubMenu.parameterDesc,
        operator: activeSubMenu.parameterOperator
    });

    useEffect(() => {
        getOperators(activeSubMenu.parameterId);
        getReferences(activeSubMenu.parameterId);
    }, []);

    const getOperators = (id) => {
        AdminService.getAttributeOperatorByAttributeId(id).then(response => {
            response && response.data && setOperators(response.data.items);
        })
    }

    const getReferences = (id) => {
        AdminService.getReferenceTypeByAttributeId(id).then(response => {
            response && response.data && setReferences(response.data.items);
        })
    }

    const deleteReferenceType = (id) => {
        AdminService.deleteReferenceType(id).then(response =>
            setReferences(references.filter(reference => reference.id !== id)))
    }

    const deleteOperatorType = (id) => {
        AdminService.deleteOperatorType(id).then(response =>
            setOperators(operators.filter(operator => operator.id !== id)))
    }

    const handleSubmit = (data, type) => {
        if (type === "Referans Tipi") {
            setReferences([]);
            AdminService.saveReferenceType(data, activeSubMenu.parameterId).then(response => {
                response && setShowSuccessModal(true)
                getReferences(activeSubMenu.parameterId);
                setReferenceTypeName("");
                setReferenceTypeDesc("");
                setReferenceTypeId(null);
            });
        }
        else {
            setOperators([]);
            AdminService.saveAllOperators(activeSubMenu.parameterId, data.names).then(response => {
                response && setShowSuccessModal(true)
                getOperators(activeSubMenu.parameterId);
                setOperatorTypeName("");
                setOperatorTypeNames([]);
                setOperatorTypeId(null);
            });
        }
    };

    const updateOperator = (operator, id) => {
        setOperators([]);
        AdminService.updateOperatorType(activeSubMenu.parameterId, operator, id).then(response => {
            response && setShowSuccessModal(true)
            getOperators(activeSubMenu.parameterId);
            setOperatorTypeNames([]);
            setOperatorTypeId(null);
        });
    }


    const removeButton = (cell, row) => {
        return (
            <Tooltip title={"Sil"} placement={"top-start"}>
                <Fab
                    style={{
                        backgroundColor: 'tomato',
                    }}
                    size="small"
                    color={"primary"}
                    aria-label="History"
                    onClick={() => {
                        setWarningShowModal(true);
                        setWarningModalBody("Silmek istediğinize emin misiniz?");
                        setReferenceTypeId(row.id)
                    }}
                >
                    <Delete></Delete>
                </Fab>
            </Tooltip>
        );
    };

    const removeOperatorButton = (cell, row) => {
        return (
            <Tooltip title={"Sil"} placement={"top-start"}>
                <Fab
                    style={{
                        backgroundColor: 'tomato',
                      }}
                    size="small"
                    color={"primary"}
                    aria-label="History"
                    onClick={() => {
                        setShowWarning(true);
                        setWarningModalBody("Silmek istediğinize emin misiniz?");
                        setOperatorTypeId(row.id);
                    }}
                >
                    <Delete></Delete>
                </Fab>
            </Tooltip>
        );
    };

    const updateButton = (cell, row) => {
        return (
            <Tooltip title={"Ekle"} placement={"top-start"}>
                <Fab
                    size="small"
                    color={"primary"}
                    aria-label="History"
                    onClick={() => {
                        setReferenceTypeName(row.name);
                        setReferenceTypeDesc(row.description);
                        setShowModal(true)
                        setReferenceTypeId(row.id)
                    }}
                >
                    <Update></Update>
                </Fab>
            </Tooltip>
        );
    };

    const updateOperatorButton = (cell, row) => {
        return (
            <Tooltip title={"Ekle"} placement={"top-start"}>
                <Fab
                    size="small"
                    color={"primary"}
                    aria-label="History"
                    onClick={() => {
                        setOperatorTypeName(row.name);
                        setShowOperatorModal(true)
                        setOperatorTypeId(row.id)
                    }}
                >
                    <Update></Update>
                </Fab>
            </Tooltip>
        );
    };

    return (
        <div>
            <ParameterDefinitionDetailView
                operators={operators}
                references={references}
                removeButton={removeButton}
                updateButton={updateButton}
                parameter={parameter}
                handleSubmit={handleSubmit}
                setShowSuccessModal={setShowSuccessModal}
                showSuccessModal={showSuccessModal}
                referenceTypeName={referenceTypeName}
                setReferenceTypeName={setReferenceTypeName}
                referenceTypeDesc={referenceTypeDesc}
                setReferenceTypeDesc={setReferenceTypeDesc}
                showModal={showModal}
                setShowModal={setShowModal}
                referenceTypeId={referenceTypeId}
                setReferenceTypeId={setReferenceTypeId}
                operatorTypeName={operatorTypeName}
                operatorTypeNames={operatorTypeNames}
                setOperatorTypeName={setOperatorTypeName}
                setOperatorTypeNames={setOperatorTypeNames}
                operatorTypeId={operatorTypeId}
                setOperatorTypeId={setOperatorTypeId}
                removeOperatorButton={removeOperatorButton}
                updateOperatorButton={updateOperatorButton}
                updateOperator={updateOperator}
                showOperatorModal={showOperatorModal}
                setShowOperatorModal={setShowOperatorModal}
            />
            <ConfirmModal
                show={showWarningModal}
                setShow={setWarningShowModal}
                title={"Onay"}
                bodyMessage={warningModalBody}
                onOk={() => {
                    deleteReferenceType(referenceTypeId);
                }}
            />
            <ConfirmModal
                show={showWarning}
                setShow={setShowWarning}
                title={"Onay"}
                bodyMessage={warningModalBody}
                onOk={() => {
                    deleteOperatorType(operatorTypeId);
                }}
            />
        </div>
    )
}
