import { request, requestAll } from "../common/utils/Request";

export const saveTask = (data) => {
    const options = {
        method: "post",
        path: "task-group",
        data: data,
    };

    return request(options);
}

export const getTaskTypes = () => {
    const options = {
        method: "get",
        path: "task-types",
    };

    return request(options);
}

export const getTasks = () => {
    const options = {
        method: "get",
        path: "task-groups",
    };

    return request(options);
}

export const updateTask = (data) => {
    const options = {
        method: "put",
        path: "task-group",
        data: data,
    };

    return request(options);
};

export const deleteTask = (id) => {

    const options = {
        method: "delete",
        path: "task-group",
        params: ["id"],
        values: [id],
    }

    return request(options);
}

export const getTaskById = (id) => {
    const options = {
        method: "get",
        path: "task-group/" + id,
    }
    return request(options);
}

export const getRoleTaskAgencies = () => {
    const options = {
        method: "get",
        path: "role-task-agencies",
    };

    return request(options);
}

export const getAgencyTasks = (agencyCodes) => {
    const options = {
        method: "get",
        path: "agency-tasks",
        params: ["agencyCodes"],
        values: [agencyCodes],
    };

    return request(options);
}

export const getStateTypes = () => {
    const options = {
        method: "get",
        path: "task-state-types",
    };

    return request(options);
}

export const saveTaskState = (taskId, taskStateId, note) => {
    const options = {
        method: "post",
        path: "task-state-information",
        params: ["taskId","taskStateId","note"],
        values: [taskId, taskStateId, note],
    };

    return request(options);
}

export const getUsersByAgencyCode = (agencyCode) => {
    const options = {
        method: "get",
        path: "users-by-agency-code",
        params: ["agencyCode"],
        values: [agencyCode],
    };

    return request(options);
}

export const saveTaskOwner = (taskId, taskOwnerName, taskOwnerUserName) => {
    const options = {
        method: "post",
        path: "task",
        params: ["taskId","taskOwnerName","taskOwnerUserName"],
        values: [taskId, taskOwnerName, taskOwnerUserName],
    };

    return request(options);
};