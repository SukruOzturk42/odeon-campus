import React, { useEffect, useState } from 'react'
import * as TaskService from '../../../../services/TaskService'
import SsoTasksDetailView from './SsoTasksDetailView'

export default function SsoTasksDetailContainer(props) {

    const {
        selectedTask,
        setSelectedTask,
        onChange,
    } = props;

    const [data, setData] = useState([]);
    const [taskState, setTaskState] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isClicked, setIsClicked] = useState({
        customerInformations: false,
        policyInformations: false,
        taskInformations: false,
        notes: false
    })

    useEffect(() => {
        getStateTypes();
    }, []);

    const getStateTypes = () => {
        TaskService.getStateTypes().then(response => {
            response &&
                setData(response.data.items)
        })
    }

    const saveTaskState = () => {
        TaskService.saveTaskState(selectedTask.id, taskState.state, taskState.note).then(response => {
            if (response && response.data) {
                setShowSuccessModal(true);
                setSelectedTask(prevState => ({
                    ...prevState,
                    taskState: taskState.label
                }))
            }
            setTaskState({})
        })
    }

    const onClick = (key, status) => {
        setIsClicked(prevState => ({ ...prevState, [key]: !status }))
    }

    const onAreaChange = (event) => {
        const { id, value, label } = event;
        if (id === "state") {
            setTaskState((state) => ({
                ...state, [id]: value,
                ["label"]: label
            }));
        }
        else {
            setTaskState((state) => ({ ...state, [id]: value }));
        }
    };

    return (
        <div>
            <SsoTasksDetailView
                selectedTask={selectedTask}
                onChange={onChange}
                onAreaChange={onAreaChange}
                onClick={onClick}
                saveTaskState={saveTaskState}
                showSuccessModal={showSuccessModal}
                setShowSuccessModal={setShowSuccessModal}
                data={data}
                taskState={taskState}
                isClicked={isClicked}
            />
        </div>
    )
}
