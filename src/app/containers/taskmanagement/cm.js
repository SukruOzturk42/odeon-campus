import TasksContainer from "./area/TasksContainer";
import CreateTaskListContainer from "./area/CreateTaskListContainer";

export const taskManagementSubMenuRoutes = {
    "task-management-sub-menu-task-list-definition": CreateTaskListContainer,
    "task-management-sub-menu-agency-list": TasksContainer,
};

export const subMenus = [
    {
        title: "Satış Fırsatları Liste Tanımlama",
        component: "test",
        name: "Liste Tanımlama",
        menuRoute: "task-management-sub-menu-task-list-definition",
    },
    {
        title: "Satış Fırsatı Görüntüleme    ",
        component: "test",
        name: "Satış Fırsatı Görüntüleme     ",
        menuRoute: "task-management-sub-menu-agency-list",
    },
  ];