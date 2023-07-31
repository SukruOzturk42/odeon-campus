import React, { useEffect, useState } from 'react'
import { PageContentArea } from '../../../components/base-component/PageContentArea'
import CreateTaskListDataTableView from './CreateTaskListDataTableView';
import CreateTaskListView from './CreateTaskListView'
import { Divider, Fab, Tooltip } from '@material-ui/core';
import { Delete, Update } from '@material-ui/icons';
import ConfirmModal from '../../../components/base-component/ConfirmModal';
import * as ObjectUtils from '../../../common/utils/ObjectUtils'
import { validate } from "./CreateTaskListValidator"
import * as TaskService from "../../../services/TaskService"

export default function CreateTaskListContainer() {

  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [warningModalBody, setWarningModalBody] = useState(false);
  const [showWarningModal, setWarningShowModal] = useState(false);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    TaskService.getTasks().then(response => {
      response && setTasks(response.data.items.map((item) => {
        return {
          ...item,
          policyNumbers: item.policyNumbers.toString()
        }
      }))
    });
  }

  const onAreaChange = (event) => {
    const { id, value } = event;
    setTask((state) => ({ ...state, [id]: value }));
    setErrors((state) => ({ ...state, [id]: "" }));
  };

  const onClick = () => {
    const error = validate(task);
    if (ObjectUtils.isEmptyObject(error)) {
      if (task.id !== null && task.id !== undefined && task.id !== 0) {
        updateTask(task);
      }
      else {
        saveTask(task);
      }
      setErrors({});
    } else {
      setErrors(error);
    }

  };

  const clearTask = () => {
    setTask({});
  };

  const saveTask = (data) => {
    setTasks([]);
    TaskService.saveTask(data).then(response => {
      getTasks();
      if (response && response.data) {
        setShowSuccessModal(true);
      }
      setTask({});
    });
  }

  const deleteTask = (id) => {
    TaskService.deleteTask(id).then(response => {
      if(response !== undefined)
      {setTasks(tasks.filter(task => task.id !== id))}
    });
  }

  const getTaskById = (id) => {
    setTask({});
    TaskService.getTaskById(id).then(response => {
      setTask(response.data)
    });
  }

  const updateTask = (data) => {
    setTasks([]);
    TaskService.updateTask(data).then(response => {
      getTasks();
      if (response && response.data) {
        setShowSuccessModal(true);
      }
      setTask({});
    });
  }

  const removeTaskListButton = (cell, row) => {
    return (
      <Tooltip title={"Sil"} placement={"top-start"}>
        <Fab
          style={{
            backgroundColor: 'tomato',
          }}
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => {
            setWarningShowModal(true);
            setWarningModalBody("Mesajı silmek istediğinize emin misiniz?");
            setRowId(row.id);
          }}
        >
          <Delete></Delete>
        </Fab>
      </Tooltip>
    );
  };

  const editTaskListButton = (cell, row) => {
    return (
      <Tooltip title={"Düzenle"} placement={"top-start"}>
        <Fab
          size="small"
          color={"primary"}
          aria-label="History"
          onClick={() => {
            getTaskById(row.id);
          }}
        >
          <Update></Update>
        </Fab>
      </Tooltip>
    );
  };


  return (
    <>
      <PageContentArea>
        <CreateTaskListView
          clearTask={clearTask}
          errors={errors}
          task={task}
          setTask={setTask}
          tasks={tasks}
          onAreaChange={onAreaChange}
          onClick={onClick}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      </PageContentArea>
      <PageContentArea title={"Satış Fırsatı Listesi"}>
        <CreateTaskListDataTableView
          removeTaskListButton={removeTaskListButton}
          editTaskListButton={editTaskListButton}
          tasks={tasks}
        />
      </PageContentArea>
      <ConfirmModal
        show={showWarningModal}
        setShow={setWarningShowModal}
        title={"Onay"}
        bodyMessage={warningModalBody}
        onOk={() => {
          deleteTask(rowId);
        }}
      />
    </>
  )
}
