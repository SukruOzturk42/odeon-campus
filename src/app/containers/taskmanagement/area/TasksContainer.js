import React, { useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import { Fab, Tooltip } from "@material-ui/core";
import { VisibilitySharp } from "@material-ui/icons";
import TasksView from './TasksView'
import * as TaskService from '../../../services/TaskService'

const TasksContainer = (props) => {

    const [selectedTask, setSelectedTask] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [agencyCodes, setAgencyCodes] = useState([]);
    const [agencyTasks, setAgencyTasks] = useState([]);
    const [temp, setTemp] = useState([]);

    useEffect(() => {
        getAgencyTasks(agencyCodes);
    }, [agencyCodes]);

    useEffect(() => {
        setTemp(agencyCodes)
    }, [selectedTask]);

    const getAgencyTasks = (agencyCodes) => {
        TaskService.getAgencyTasks(agencyCodes).then(response => {
            response && setAgencyTasks(response.data.items.map(item => {
                return {
                    ...item,
                    name: item.taskType.name,
                    taskState: item.taskStateInformation.taskState.description
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
            <TasksView
                taskManagementDetailFormatter={taskManagementDetailFormatter}
                selectedTask={selectedTask}
                setSelectedTask={setSelectedTask}
                onAreaChange={onAreaChange}
                onClick={onClick}
                setShowSuccessModal={setShowSuccessModal}
                showSuccessModal={showSuccessModal}
                agencyCodes={agencyCodes}
                setAgencyCodes={setAgencyCodes}
                agencyTasks={agencyTasks}
                temp={temp}
                setTemp={setTemp}
            />
        </>
    );
};
export default injectIntl(TasksContainer);
