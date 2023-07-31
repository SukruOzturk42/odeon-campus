import React, { useState, useEffect, useContext } from "react";
import { PageContentArea } from "../../../../components/base-component/PageContentArea";
import CampaignCustomerView from "./CampaignCustomerView";
import {
  createContactGroup,
  getContactGroupsTempExcel,
  getAllContactGroups,
  exportContactGroupContacts,
  deleteContactGroup,
} from "../../../../services/contactService";
import {validate} from "./CampaignCustomerValidator";
import * as ObjectUtils from "../../../../common/utils/ObjectUtils";


export default function CampaignCustomerContainer() {
  const [campaignContactGroup, setCampaignContactGroup] = useState({});
  const [contactGroups, setContactGroups] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getContactGroups();
  }, []);

  const getContactGroups = () => {
    getAllContactGroups().then((response) => {
      response && response.data && setContactGroups(response.data.items);
    });
  };

  const onAreaChange = (event) => {
    const { id, value } = event;
    setCampaignContactGroup((prev) => ({ ...prev, [id]: value }));
};
  const saveContactInformation = () => {
    const error = validate(campaignContactGroup);

    if (ObjectUtils.isEmptyObject(error)) {
      createContactGroup(campaignContactGroup).then((response) => {
        if (response) {
          alert("Ekleme Başarılı");
          getContactGroups();
          setCampaignContactGroup({});
        }
      });
      setErrors({});
    }else {
      if(ObjectUtils.isNonUndefinedOrNonNull(error.contactFile)){
        alert("Müşteri Listesi Giriniz");
      }
      setErrors(error);
    }
  };
  const handleDeleteContactGroup = (groupId) => {
    deleteContactGroup(groupId).then((response) => {
      if (response && response.data) {
        alert("Grup Silindi");
        getContactGroups();
      }
    });
  };

  const exportContacts = (contactGroupId) => {
    exportContactGroupContacts(contactGroupId).then((response) => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" });
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "contact-group.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  const exportToTempExcel = () => {
    getContactGroupsTempExcel().then((response) => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" });
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "template-contact-group.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  return (
    <div>
      <PageContentArea
        buttonText={"Örnek Excel İndir"}
        buttonOnClick={exportToTempExcel}
      >
        <CampaignCustomerView
          campaignContactGroup={campaignContactGroup}
          contactGroups={contactGroups}
          handleDeleteContactGroup={handleDeleteContactGroup}
          exportContacts={exportContacts}
          onChange={onAreaChange}
          saveContactInformation={saveContactInformation}
          error={errors}
        />
      </PageContentArea>
    </div>
  );
}
