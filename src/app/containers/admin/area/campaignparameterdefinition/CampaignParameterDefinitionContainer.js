import React, { useState, useEffect } from 'react'
import { PageContentArea } from '../../../../components/base-component/PageContentArea'
import CampaignParameterDefinitionDataTableView from './CampaignParameterDefinitionDataTableView'
import * as AdminService from "../../../../services/AdminService"
import CampaignParameterDefinitionView from './CampaignParameterDefinitionView';
import { Tooltip, Fab } from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import ConfirmModal from '../../../../components/base-component/ConfirmModal';
import * as ObjectUtils from '../../../../common/utils/ObjectUtils'
import { validate } from "./CreateCampaignParameterValidator"

export default function CampaignParameterDefinitionContainer() {

    const [campaignAttribute, setCampaignAttribute] = useState({});
    const [campaignAttributes, setCampaignAttributes] = useState([]);
    const [campaignStructures, setCampaignStructures] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [warningModalBody, setWarningModalBody] = useState(false);
    const [showWarningModal, setWarningShowModal] = useState(false);
    const [campaignTypeId, setCampaignTypeId] = useState(0);
    const [rowId, setRowId] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getCampaignAttributes();
        getCompanyCampaignStructures();
    }, []);

    const getCampaignAttributes = () => {
        AdminService.getCampaignAttributes().then(response => response && setCampaignAttributes(response.data.items));
    }

    const saveCampaignAttribute = () => {
        setCampaignAttributes([]);
        AdminService.saveCampaignAttribute(campaignAttribute).then(response => {
            response &&
                getCampaignAttributes();
            setCampaignAttribute({});
            setCampaignTypeId(0);
            if (response !== undefined) {
                setShowSuccessModal(true);
            }
        })
    }

    const validateCampaignAttribute = () => {
        const error = validate(campaignAttribute);
        if (ObjectUtils.isEmptyObject(error)) {
            saveCampaignAttribute();
            setErrors({});
        } else {
            setErrors(error);
        }
    }

    const getCompanyCampaignStructures = (id) => {
        AdminService.getCompanyCampaignStructures().then(response => response &&
            setCampaignStructures(
                response.data.items.map((item) => {
                    return { label: item.description, value: item.id };
                })
            ));
    }

    const deleteCampaignAttribute = (id) => {
        AdminService.deleteCampaignAttribute(id).then(response =>
            setCampaignAttributes(campaignAttributes.filter(attribute => attribute.id !== id)));
    }

    const onAreaChange = (event) => {
        const { id, value } = event;
        setCampaignAttribute((state) => ({ ...state, [id]: value }));
        campaignAttribute.campaignTypeId = campaignTypeId;
        setErrors((state) => ({ ...state, [id]: "" }));
    };

    const removeCampaignAttribute = (cell, row) => {
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
                        setWarningModalBody("Mesajı silmek istediğinize emin misiniz?");
                        setRowId(row.id);
                    }}
                >
                    <Delete></Delete>
                </Fab>
            </Tooltip>
        );
    };

    return (
        <PageContentArea>
            <CampaignParameterDefinitionView
                onChange={onAreaChange}
                campaignStructures={campaignStructures}
                campaignAttribute={campaignAttribute}
                saveCampaignAttribute={validateCampaignAttribute}
                showSuccessModal={showSuccessModal}
                setShowSuccessModal={setShowSuccessModal}
                errors={errors}
                setCampaignTypeId={setCampaignTypeId}
                campaignTypeId={campaignTypeId}
            />
            <CampaignParameterDefinitionDataTableView
                campaignAttributes={campaignAttributes}
                campaignAttribute={campaignAttribute}
                removeCampaignAttribute={removeCampaignAttribute}
            />
            <ConfirmModal
                show={showWarningModal}
                setShow={setWarningShowModal}
                title={"Onay"}
                bodyMessage={warningModalBody}
                onOk={() => {
                    deleteCampaignAttribute(rowId);
                }}
            />
        </PageContentArea>
    )
}
