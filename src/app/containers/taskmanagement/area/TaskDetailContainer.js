import React, { useState, useEffect } from "react";
import * as TaskService from "../../../services/TaskService";
import TaskDetailView from "./TasksDetailView";

export default function TaskDetailContainer(props) {
  const { selectedTask, setSelectedTask, onChange } = props;

  const [data, setData] = useState([]);
  const [taskState, setTaskState] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [refTaskOwner, setRefTaskOwner] = useState({});
  const [isClicked, setIsClicked] = useState({
    customerInformations: false,
    policyInformations: false,
    taskInformations: false,
    notes: false,
  });

  useEffect(() => {
    getStateTypes();
  }, []);

  useEffect(() => {
    setRefTaskOwner({
      taskOwnerName: selectedTask.taskOwnerName,
      taskOwnerUserName: selectedTask.taskOwnerUserName,
    });
  }, []);

  const getStateTypes = () => {
    TaskService.getStateTypes().then((response) => {
      response && setData(response.data.items);
    });
  };

  const saveTaskOwner = () => {
    TaskService.saveTaskOwner(selectedTask.id, selectedTask.taskOwnerName, selectedTask.taskOwnerUserName).then((response) => {
      if (response && response.data) {
        setShowSuccessModal(true);
        setRefTaskOwner({
          taskOwnerName: selectedTask.taskOwnerName,
          taskOwnerUserName: selectedTask.taskOwnerUserName,
        });
      }
    });
  };
  const saveTaskState = () => {
    TaskService.saveTaskState(
      selectedTask.id,
      taskState.state,
      taskState.note
    ).then((response) => {
      if (response && response.data) {
        setShowSuccessModal(true);
        setSelectedTask((prevState) => ({
          ...prevState,
          taskState: taskState.label,
        }));
      }
      setTaskState({});
    });
  };
  const onClick = (key, status) => {
    setIsClicked((prevState) => ({ ...prevState, [key]: !status }));
  };

  const onAreaChange = (event) => {
    const { id, value, label } = event;
    if (id === "state") {
      setTaskState((state) => ({
        ...state,
        [id]: value,
        ["label"]: label,
      }));
    } else {
      setTaskState((state) => ({ ...state, [id]: value }));
    }
  };

  return (
    <TaskDetailView
      selectedTask={selectedTask}
      refTaskOwner={refTaskOwner}
      onChange={onChange}
      onAreaChange={onAreaChange}
      onClick={onClick}
      saveTaskState={saveTaskState}
      showSuccessModal={showSuccessModal}
      setShowSuccessModal={setShowSuccessModal}
      data={data}
      taskState={taskState}
      isClicked={isClicked}
      saveTaskOwner={saveTaskOwner}
    />
  );
}
