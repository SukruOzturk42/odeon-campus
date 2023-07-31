import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../../../../context/GlobalState";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import * as AdminService from "../../../../services/AdminService";
import ParameterDefinitionDatatableView from "./ParameterDefinitionDatatableView";
import ParamaterDefinitionCreateView from "./ParamaterDefinitonCreateView";
import ConfirmModal from "../../../../components/base-component/ConfirmModal";
import { Tooltip, Fab } from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import { validateParameter } from "./CreateParameterValidator";
import * as ObjectUtils from '../../../../common/utils/ObjectUtils'

export default function CodeUploadContainer() {
  const { activeSubMenu } = useContext(GlobalContext);
  const [attributes, setAttributes] = useState([]);
  const [attribute, setAttribute] = useState({});
  const [errors, setErrors] = useState({});
  const [campaignTypeId, setCampaignTypeId] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [warningModalBody, setWarningModalBody] = useState(false);
  const [showWarningModal, setWarningShowModal] = useState(false);
  const [rowId, setRowId] = useState(0);

  useEffect(() => {
    getAttributes();
  }, []);

  const getAttributes = () => {
    AdminService.getAttributes().then(response => response && setAttributes(response.data.items));
  }

  const getAttributeById = (id) => {
    AdminService.getAttributeById(id).then(response => setAttribute(response.data));
  }

  const saveParameter = () => {
    setAttributes([]);
    AdminService.saveParameter(attribute, campaignTypeId).then(response => {
      setShowSuccessModal(true);
      getAttributes();
      setAttribute({});
      setCampaignTypeId(null);
    });

  }

  const validationParameter = () => {
    const error = validateParameter(attribute, campaignTypeId, attributes);
    if (ObjectUtils.isEmptyObject(error)) {
      saveParameter();
      setErrors({});
    } else {
      setErrors(error);
    }

  }

  const deleteParameter = (id) => {
    AdminService.deleteParameter(id).then(response =>
      setAttributes(attributes.filter(response => response.id !== id)));
  }

  const onAreaChange = (event) => {
    const { id, value } = event;
    setAttribute((state) => ({ ...state, [id]: value }));
    setErrors((state) => ({ ...state, [id]: "" }));
  };

  const updateCampaignTypeId = (event) => {
    const { id, value } = event;
    setCampaignTypeId(value);
    setErrors({
      name: errors.name,
      description: errors.description,
      dataType: errors.dataType,
      campaignTypeId: ""
    })
  }

  const removeAttributeButton = (cell, row) => {
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

  const editParameter = (cell, row) => {
    return (
      <Tooltip title={"Düzenle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => getAttributeById(row.id)}
        >
          <Update></Update>
        </Fab>
      </Tooltip>
    );
  };

  return (
    <PageContentArea>
      <ParamaterDefinitionCreateView
        attribute={attribute}
        errors={errors}
        onChange={onAreaChange}
        onClick={validationParameter}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
        campaignTypeId={campaignTypeId}
        updateCampaignTypeId={updateCampaignTypeId}
      />
      <ParameterDefinitionDatatableView
        attributes={attributes}
        removeAttributeButton={removeAttributeButton}
        editParameter={editParameter}
      />
      <ConfirmModal
        show={showWarningModal}
        setShow={setWarningShowModal}
        title={"Onay"}
        bodyMessage={warningModalBody}
        onOk={() => {
          deleteParameter(rowId);
        }}
      />
    </PageContentArea>
  );
}