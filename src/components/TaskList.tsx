import { useState, useEffect } from "react";
import "./TaskList.scss";
import Task from "./Task";
import { TaskController } from "../controllers/TaskController";
import TaskModel from "../models/TaskModel";
import { useModalContext, useSortContext } from "../utils/hook";
import Loading from "./Loading";

export default function TaskList({ tasksToGet }: { tasksToGet: string }) {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    onSort,
    isSortAscending,
    isSortByCreateDate,
    isSortByDueDate,
    isSortByStatus,
    sortOption,
    setIsSortAscending,
  } = useSortContext();

  const formModal = useModalContext("form");
  if (formModal.selectValue) {
    formModal.selectValue(tasksToGet);
  }

  async function getTasks() {
    const tasksFetched = await TaskController.getTasks();
    const taskSorted = onSort(sortOption, tasksFetched);
    const taskSortedByStatus = onSort("status", taskSorted);
    setTasks(taskSortedByStatus);
    setIsLoading(false);
  }
  async function getTasksbyStatus(tasksToGet: string) {
    const tasksFetched = await TaskController.getTasksbyStatus(tasksToGet);
    const taskSorted = onSort(sortOption, tasksFetched);
    setTasks(taskSorted);
    setIsLoading(false);
  }

  useEffect(() => {
    if (tasksToGet === "All") {
      getTasks();
    } else {
      getTasksbyStatus(tasksToGet);
    }
  }, []);

  useEffect(() => {
    const taskSorted = onSort(sortOption, tasks);
    setTasks(taskSorted);
  }, [isSortAscending]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="sort">
        <button
          className={isSortByStatus ? "active" : ""}
          onClick={() => {
            const taskSorted = onSort("status", tasks);
            setTasks(taskSorted);
          }}
        >
          tri par statut
        </button>
        <button
          className={isSortByDueDate ? "active" : ""}
          onClick={() => {
            const taskSorted = onSort("dueDate", tasks);
            setTasks(taskSorted);
          }}
        >
          tri par date d'échéance
        </button>
        <button
          className={isSortByCreateDate ? "active" : ""}
          onClick={() => {
            const taskSorted = onSort("createDate", tasks);
            setTasks(taskSorted);
          }}
        >
          tri par date de création
        </button>
        <button
          className={isSortAscending ? "active" : ""}
          onClick={() => {
            setIsSortAscending(true);
          }}
        >
          du plus récent au plus vieux
        </button>
        <button
          className={isSortAscending ? "" : "active"}
          onClick={() => {
            setIsSortAscending(false);
          }}
        >
          du plus vieux au plus récent
        </button>
      </div>
      <div className="tasks">
        {tasks.map((task: any) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}
