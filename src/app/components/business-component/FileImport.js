import React, { useEffect, useState } from "react";
import { Col, Form } from "react-bootstrap";
import { removeProperty } from "../../common/utils/Util";
import * as Utils from "../../common/utils/Util";
import {Card} from "../../_metronic/_partials/controls";
import {makeStyles} from "@material-ui/core";

export const FileImport = (props) => {
  const _md = props.md ? props.md : "12";

  let className = props.action && " mb-0 ";

  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    error: { color: "red" },
  }));
  const newProps = removeProperty(props, "disabled");
  const [selectedFile, setSelectedFile] = useState(props.selectedFile);
  const classes = useStyles();

  useEffect(() => {
    setSelectedFile(undefined);
  }, [props.selectedFile]);
  useEffect(() => {
    console.log(props.error)
  }, [props]);

  const onChangeFileSelect = (event) => {
    if (event.target.files.length > 0) {
      let selectedFile = event.target.files[0];
      let fileSize = selectedFile.size;
      const maxSize = props.maxSize ? props.maxSize : 2097152;
      if (maxSize <= 2097152) {
        Utils.fileToBase64(selectedFile).then((result) => {
          setSelectedFile(selectedFile);
          props.onChange({
            id: props.id,
            value: {
              data: result,
              fileName: selectedFile.name,
              size: selectedFile.size,
              type: selectedFile.type,
            },
          });
        });
      } else {
        alert("Dosya seçme başarısız, maksiumum sınır " + maxSize + "b");
      }
    }
  };
  const onClickFileSelect = (event) => {
    setSelectedFile(undefined);
  };

  return (
    <Form.Group
      className={className}
      as={Col}
      md={
        props.offset
          ? { size: _md, offset: props.offset ? props.offset : 0 }
          : _md
      }
    >
      <Form.File
        selectedFile={selectedFile}
        className="position-relative"
        disabled={props.disabled ? props.disabled : false}
        name="file"
        label={props.text}
        {...newProps}
        key={props.key}
        onChange={onChangeFileSelect}
        onClick={onClickFileSelect}
        accept={
          props.accept
            ? props.accept
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
      />
      {props.error && <span className={classes.error}>{props.error}</span>}
    </Form.Group>
);
};

export default FileImport;
