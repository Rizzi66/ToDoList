import { useState, useEffect } from "react";
import Task from "./Task";
import { TaskController } from "../controllers/TaskController";
import { useModalContext, useSortContext, useTaskContext } from "../utils/hook";
import Loading from "./Loading";
import TaskModel from "../models/TaskModel";

export default function TaskList({ tasksToGet }: { tasksToGet: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { tasks, setTasks } = useTaskContext();
  const { onSort } = useSortContext();

  const formModal = useModalContext("form");

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
    if (formModal.selectValue) {
      formModal.selectValue(tasksToGet);
    }
  }, []);

  return (
    <div className="overflow-x-auto flex justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="table w-full place-content-center mx-4">
          <thead>
            <tr className="grid grid-cols-[96px_1fr_40px_40px] grid-rows-2 sm:table-row bg-black/5 *:py-1 border border-primary">
              <th className="row-span-2 flex items-center">Statut</th>
              <th className="pl-0 sm:pl-4 col-span-3">Titre</th>
              <th className="hidden lg:table-cell">Description</th>
              <th className="pl-0 sm:pl-4">Date d'expiration</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: TaskModel) => (
              <Task key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
