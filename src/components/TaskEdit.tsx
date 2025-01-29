import { TaskController } from "../controllers/TaskController";
import { useModalContext } from "../utils/hook";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Delete from "../assets/Delete.svg";
import TaskModel from "../models/TaskModel";

export default function TaskEdit() {
  const formModal = useModalContext("form");
  const confirmModal = useModalContext("confirm");
  const [task, setTask] = useState<TaskModel | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  async function getTask(taskID: number) {
    const { id, titre, description, statut, date_expiration, date_creation } = await TaskController.getTask(taskID);
    const newTask = new TaskModel(id, titre, description, statut, date_expiration, date_creation);
    setTask(newTask);
    setIsLoading(false);
  }

  async function createTask(taskCreated: TaskModel) {
    await TaskController.createTask(taskCreated);
    window.location.reload();
  }

  async function modifyTask(taskModified: TaskModel, id: number) {
    await TaskController.modifyTask(id, taskModified);
    window.location.reload();
  }

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formModal.taskID === null) {
      createTask(task!);
    } else {
      modifyTask(task!, formModal.taskID);
    }
  };

  const setStatusClass = (status: string | undefined) => {
    switch (status) {
      case "A faire":
        return "border-l-4 border-green-500 focus:border-l-4 focus:border-green-500";
      case "En cours":
        return "border-l-4 border-blue-500 focus:border-l-4 focus:border-blue-500";
      case "Terminee":
        return "border-l-4 border-gray-500 focus:border-l-4 focus:border-gray-500";
    }
  };

  useEffect(() => {
    if (formModal.taskID !== null) {
      getTask(formModal.taskID);
    } else {
      setTask((prevValues: any) => ({
        ...prevValues,
        status: formModal.selectedValue,
      }));
      setIsLoading(false);
    }
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <form onSubmit={onSubmit}>
        {task ? (
          <div className="text-[0.7rem] text-xs pb-[8px]">
            <span>Date de création : </span>
            <span>{task.dateCreate}</span>
          </div>
        ) : (
          ""
        )}
        <button type="button" onClick={formModal.close} className="btn btn-circle btn-ghost absolute right-1 top-1">
          X
        </button>
        <div className="flex flex-row justify-between">
          <select
            className={`font-bold text-sm sm:text-base select select-bordered w-1/2 max-w-xs h-[4rem] mr-[1rem] sm:mr-[2rem] ${setStatusClass(
              task?.status
            )}`}
            name="status"
            id="status"
            value={task?.status}
            onChange={onChange}
          >
            <option value="A faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminee">Terminée</option>
          </select>
          <label htmlFor="dateExp" className="form-control w-1/2 h-[4rem]">
            <div className="label pb-0 pt-0">
              <span className="label-text text-[0.7rem]">Date d'expiration</span>
            </div>
            <input
              type="date"
              name="dateExp"
              id="dateExp"
              value={task?.dateExp}
              onChange={onChange}
              className="text-xs sm:text-base input input-bordered"
            />
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <label htmlFor="title" className={`form-control ${task ? "w-11/12 mr-[0.5rem]" : "w-full"}`}>
            <div className="label pb-0">
              <span className="label-text">Titre</span>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value={task?.title}
              onChange={onChange}
              required
              className="input input-bordered w-full"
            />
          </label>
          {task ? (
            <button
              type="button"
              onClick={() => confirmModal.open(formModal.taskID, task?.title)}
              className="mt-[1.75rem] mb-0 m-auto"
            >
              <Delete />
            </button>
          ) : (
            ""
          )}
        </div>
        <label htmlFor="description" className="form-control">
          <div className="label pb-0">
            <span className="label-text">Description</span>
          </div>
          <textarea
            name="description"
            id="description"
            value={task?.description ? task.description : undefined}
            onChange={onChange}
            className="textarea textarea-bordered resize-none h-48"
          ></textarea>
        </label>
        <div className="flex justify-center">
          <input type="submit" value="Valider" className="btn btn-neutral btn-wide mt-4 justify-end" />
        </div>
      </form>
    </>
  );
}
