import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import EditOutlined from "@material-ui/icons/EditOutlined";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";

const NewVersionCampaignButton = (props) => {
  const { onClick, intl, disabled } = props;
  const useStyles2 = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(10),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  const classes2 = useStyles2();
  return (
    <span className="pr-3">
      <Tooltip title={"Düzenle"} placement="top-start">
        <Fab
          size="small"
          color={"primary"}
          aria-label="Add"
          disabled={disabled}
          onClick={onClick}
        >
          <EditOutlined></EditOutlined>
        </Fab>
      </Tooltip>
    </span>
  );
};
export default NewVersionCampaignButton;
