import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Fab, Tooltip } from "@material-ui/core";
import { VisibilitySharp } from "@material-ui/icons";
import SsoTasksView from "./SsoTasksView";
import * as TaskService from '../../../../services/TaskService'

const SsoTasksContainer = (props) => {

  const [selectedTask, setSelectedTask] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [agencyCode, setAgencyCode] = useState("");
  const [agencyTasks, setAgencyTasks] = useState([]);

  useEffect(() => {
    getAgencyTasks(agencyCode);
  }, [agencyCode]);

  const getAgencyTasks = (agencyCode) => {
    TaskService.getAgencyTasks(agencyCode).then(response => {
      response && setAgencyTasks(response.data.items.map(item => {
        return {
          ...item,
          name: item.taskType.name,
          taskState: item.taskStateInformation.taskState.name
        }
      }))
    });
  }

  const onClick = (row) => {
    setSelectedTask(row);
  }

  const onAreaChange = (event) => {
    const { id, value } = event;
    setSelectedTask((state) => ({ ...state, [id]: value }));
    setErrors((state) => ({ ...state, [id]: "" }));
  };

  const taskManagementDetailFormatter = (cell, row) => {
    return (
      <Tooltip title={"Görüntüle"} placement={"top-start"} >
        <Fab
          style={{
            backgroundColor: 'cornflowerblue',
          }}
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => {
            onClick(row)
          }}
        >
          <VisibilitySharp />
        </Fab>
      </Tooltip>
    );
  };

  return (
    <>
      <SsoTasksView
        taskManagementDetailFormatter={taskManagementDetailFormatter}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        onAreaChange={onAreaChange}
        onClick={onClick}
        setShowSuccessModal={setShowSuccessModal}
        showSuccessModal={showSuccessModal}
        agencyCode={agencyCode}
        setAgencyCode={setAgencyCode}
        agencyTasks={agencyTasks}
      />
    </>
  );
};
export default injectIntl(SsoTasksContainer);

