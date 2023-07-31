import { Modal } from "antd";
import "antd/dist/antd.css";

export const errorModal = (content, okText = "Ok") => {
  Modal.error({
    content: content,
    onOk() {},
    okText: okText,
  });
};

export const successModal = (content, okText = "Ok") => {
  Modal.success({
    content: content,
    onOk() {},
    okText: okText,
  });
};
