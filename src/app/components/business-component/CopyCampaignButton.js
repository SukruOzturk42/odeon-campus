import React, { useEffect, useState } from "react";
import { injectIntl } from "react-intl";
import FileCopyRounded from "@material-ui/icons/FileCopyRounded";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";

const CopyCampaignButton = (props) => {
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
      <Tooltip title={"Kopya Oluştur"} placement="top-start">
        <Fab
          size="small"
          color={"primary"}
          aria-label="Add"
          onClick={onClick}
          disabled={disabled}
        >
          <FileCopyRounded></FileCopyRounded>
        </Fab>
      </Tooltip>
    </span>
  );
};
export default CopyCampaignButton;
