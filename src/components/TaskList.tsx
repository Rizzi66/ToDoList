import { useState, useEffect } from "react";
import "./TaskList.scss";
import Task from "./Task";
import { TaskController } from "../controllers/TaskController";
import { useModalContext, useSortContext, useTaskContext } from "../utils/hook";
import Loading from "./Loading";

export default function TaskList({ tasksToGet }: { tasksToGet: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tasks, setTasks } = useTaskContext();
  const { onSort } = useSortContext();

  const formModal = useModalContext("form");
  if (formModal.selectValue) {
    formModal.selectValue(tasksToGet);
  }

  async function getTasks() {
    const tasksFetched = await TaskController.getTasks();
    const taskSorted = onSort("status", tasksFetched);
    setTasks(taskSorted);
    setIsLoading(false);
  }
  async function getTasksbyStatus(tasksToGet: string) {
    const tasksFetched = await TaskController.getTasksbyStatus(tasksToGet);
    const taskSorted = onSort("dueDate", tasksFetched);
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

  return isLoading ? (
    <Loading />
  ) : (
    <div className="tasks">
      {tasks.map((task: any) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
