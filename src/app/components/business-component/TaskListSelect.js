import React, { useState, useEffect } from 'react'
import Select from '../base-component/Select';
import * as TaskService from '../../services/TaskService'

const TaskListSelect = (props) => {

    const { onChange, value, md, error, tasks, selectedTask, isClearable } = props;
    const [taskTypes, setTaskTypes] = useState([]);
    const [filtredTaskTypes, setFilteredTaskTypes] = useState([]);

    useEffect(() => {
        getTaskTypes();
    }, []);

    useEffect(() => {
        if (tasks.length > 0) { filterTaskTypes(); }
    }, [tasks, selectedTask]);

    const getTaskTypes = () => {
        TaskService.getTaskTypes().then(response => {
            if (response && response.data && response.data.items) {
                setTaskTypes(response.data.items)
            }
        });
    }

    const filterTaskTypes = () => {
        setFilteredTaskTypes(taskTypes.filter((el) => {
            return !tasks.some((f) => {
                return f.taskTypeId === el.id;
            });
        }))
        if (selectedTask && selectedTask.taskTypeId) {
            let currentTaskType = taskTypes.find((item) => item.id === selectedTask.taskTypeId)
            if(filtredTaskTypes.filter(item => item === currentTaskType)[0] === {} || filtredTaskTypes.filter(item => item === currentTaskType)[0] === undefined)
            {setFilteredTaskTypes(prevState => ([...prevState, currentTaskType]))}
        }
    }

    return (
        <Select
            id="taskTypeId"
            name="taskTypeId"
            label={"Liste İsmi"}
            isClearable={isClearable}
            md={md ? md : 12}
            onChange={onChange}
            options={filtredTaskTypes.map((item) => {
                return { label: item.name, value: item.id };
            })}
            value={value ? value : undefined}
            error={error}
        />
    )
}

export default TaskListSelect;