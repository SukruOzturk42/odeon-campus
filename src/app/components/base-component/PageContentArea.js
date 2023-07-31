import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../_metronic/_partials/controls";
import { useSubheader } from "../../_metronic/layout";
import { OmitProps } from "antd/lib/transfer/renderListBody";

export function PageContentArea({ children, ...props }) {
  const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    error: { color: "red" },
  }));

  const classes = useStyles();
  const subheader = useSubheader();

  useEffect(() => {
    if (props.title && props.title !== "") {
      subheader.setTitle("");
    }
  }, [props.buttonText]);

  return (
    <>
      <Card>
        {props.showHeader !== false && (
          <CardHeader title={props.title}>
            {props.buttonText && (
              <>
                <CardHeaderToolbar>
                  <button
                    type="button"
                    className={
                      props.variant
                        ? "btn btn-" + props.variant
                        : "btn btn-primary"
                    }
                    onClick={props.buttonOnClick}
                  >
                    {props.buttonText}
                  </button>
                </CardHeaderToolbar>
              </>
            )}
          </CardHeader>
        )}
        <CardBody>{children}</CardBody>
        {props.error && <span className={classes.error}>{props.error}</span>}
      </Card>
    </>
  );
}
