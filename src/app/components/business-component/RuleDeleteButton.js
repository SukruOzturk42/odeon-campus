import React from "react";
import { injectIntl } from "react-intl";
import { makeStyles, Fab, Tooltip } from "@material-ui/core";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const RuleDeleteButton = (props) => {
  const { onClick, authStatus, intl, variant } = props;

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
      <Tooltip
        title={intl.formatMessage({
          id: "Kuralı Sil",
        })}
        placement="top-start"
      >
        <Fab
          size="small"
          color={variant ? variant : "primary"}
          aria-label="Add"
          className={classes2.margin}
          onClick={onClick}
        >
          <ClearRoundedIcon></ClearRoundedIcon>
        </Fab>
      </Tooltip>
    </span>
  );
};

export default injectIntl(RuleDeleteButton);
