import React, { useState, useEffect } from 'react'
import MessageManagementView from './MessageManagementView'
import MessageManagementDataTableView from './MessageManagementDataTableView'
import * as AdminService from "../../../../services/AdminService";
import { Tooltip, Fab } from "@material-ui/core";
import { Delete, Update } from "@material-ui/icons";
import { validate } from "./CreateMessageValidator"
import * as ObjectUtils from '../../../../common/utils/ObjectUtils'
import ConfirmModal from '../../../../components/base-component/ConfirmModal'



export default function MessageManagementContainer() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [warningModalBody, setWarningModalBody] = useState(false);
  const [showWarningModal, setWarningShowModal] = useState(false);
  const [rowId, setRowId] = useState(0);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    AdminService.getMessages().then(response =>
      response && setMessages(response.data.items));
  }

  const saveMessage = (data) => {
    setMessages([]);
    AdminService.saveMessage(data).then(response => {
      getMessages();
      if (messages.filter(response => response.key === message.key).length === 0) {
        setShowSuccessModal(true);
      }
      setMessage({});
    });
  }

  const deleteMessage = (id) => {
    AdminService.deleteMessage(id).then(response =>
      setMessages(messages.filter(message => message.id !== id)));
  }

  const getMessageById = (id) => {
    AdminService.getMessageById(id).then(response => setMessage(response.data));
  }

  const updateMessage = (data) => {
    setMessages([]);
    AdminService.updateMessage(data).then(response => {
      getMessages();
      setMessage({});
    });
  }

  const onAreaChange = (event) => {
    const { id, value } = event;
    setMessage((state) => ({ ...state, [id]: value }));
    setErrors((state) => ({ ...state, [id]: "" }));
  };

  const saveExceptionMessage = () => {
    const error = validate(message);
    if (ObjectUtils.isEmptyObject(error)) {
      if (message.id !== null && message.id !== undefined && message.id !== 0) {
        updateMessage(message);
      }
      else { saveMessage(message); }
      setErrors({});
    } else {
      setErrors(error);
    }

  }

  const removeMessageButton = (cell, row) => {
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

  const editMessage = (cell, row) => {
    return (
      <Tooltip title={"Düzenle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => getMessageById(row.id)}
        >
          <Update></Update>
        </Fab>
      </Tooltip>
    );
  };

  const exportMessages = () => {
    AdminService.exportMessages().then(response => {
      try {
        if (response) {
          let blob = new Blob([response], { type: "application/vnd.ms-excel" });
          let url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "campusmessages.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      }
      catch (e) {
        console.log(e);
      }
    });
  }

  return (
    <div>
      <MessageManagementView
        message={message}
        errors={errors}
        onChange={onAreaChange}
        onClick={saveExceptionMessage}
        exportMessages={exportMessages}
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
      <MessageManagementDataTableView
        messages={messages}
        removeMessage={removeMessageButton}
        editMessage={editMessage}
      />
      <ConfirmModal
        show={showWarningModal}
        setShow={setWarningShowModal}
        title={"Onay"}
        bodyMessage={warningModalBody}
        onOk={() => {
          deleteMessage(rowId);
        }}
      />
    </div>
  )
}
