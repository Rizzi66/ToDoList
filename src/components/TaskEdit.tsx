import { TaskController } from "../controllers/TaskController";
import { useModalContext } from "../utils/hook";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import Delete from "../assets/Delete.svg";

export interface TaskFormatedType {
  id: number;
  title: string;
  description: string;
  dateExp?: string;
  dateCreate: string;
  status: string;
}

export default function TaskForm() {
  const formModal = useModalContext("form");
  const confirmModal = useModalContext("confirm");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [taskFormated, setTaskFormated] = useState<TaskFormatedType>();
  const [taskToCreate, SetTaskToCreate] = useState<boolean>(false);

  async function getTask(taskID: number) {
    const taskFetched = await TaskController.getTask(taskID);

    setTaskFormated({
      id: taskFetched.id,
      title: taskFetched.titre,
      description: taskFetched.description,
      dateExp: taskFetched.date_expiration?.toString().split("T")[0],
      dateCreate: taskFetched.date_creation
        ? new Date(taskFetched.date_creation).toLocaleString("fr-FR", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })
        : "Date non définie",
      status: taskFetched.statut,
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (formModal.taskID !== null) {
      getTask(formModal.taskID);
    } else {
      SetTaskToCreate(true);
      setTaskFormated((prevValues: any) => ({
        ...prevValues,
        status: formModal.selectedValue,
      }));
      setIsLoading(false);
    }
  }, []);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setTaskFormated((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formModal.taskID === null) {
      createTask(taskFormated!);
    } else {
      modifyTask(taskFormated!, formModal.taskID);
    }
  };

  async function createTask(taskCreated: TaskFormatedType) {
    await TaskController.createTask(taskCreated);
    window.location.reload();
  }

  async function modifyTask(taskModified: TaskFormatedType, id: number) {
    await TaskController.modifyTask(id, taskModified);
    window.location.reload();
  }
  const getBackgroundClass = (status: string | undefined) => {
    switch (status) {
      case "A faire":
        return "border-l-4 border-green-500 focus:border-l-4 focus:border-green-500";
      case "En cours":
        return "border-l-4 border-blue-500 focus:border-l-4 focus:border-blue-500";
      case "Terminee":
        return "border-l-4 border-gray-500 focus:border-l-4 focus:border-gray-500";
      default:
        return "";
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <form onSubmit={onSubmit}>
        {!taskToCreate ? (
          <div className="text-[0.7rem] text-xs pb-[8px]">
            <span>Date de création : </span>
            <span>{taskFormated?.dateCreate}</span>
          </div>
        ) : (
          ""
        )}
        <button
          type="button"
          onClick={formModal.close}
          className="btn btn-circle btn-ghost absolute right-1 top-1"
        >
          X
        </button>
        <div className="flex flex-row justify-between">
          <select
            className={`font-bold text-sm sm:text-base select select-bordered w-1/2 max-w-xs h-[4rem] mr-[1rem] sm:mr-[2rem] ${getBackgroundClass(
              taskFormated?.status
            )}`}
            name="status"
            id="status"
            value={taskFormated?.status}
            onChange={onChange}
          >
            <option value="A faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminee">Terminée</option>
          </select>
          <label htmlFor="dateExp" className="form-control w-1/2 h-[4rem]">
            <div className="label pb-0 pt-0">
              <span className="label-text text-[0.7rem]">
                Date d'expiration
              </span>
            </div>
            <input
              type="date"
              name="dateExp"
              id="dateExp"
              value={taskFormated?.dateExp}
              onChange={onChange}
              className="text-xs sm:text-base input input-bordered"
            />
          </label>
        </div>
        <div className="flex flex-row justify-between">
          <label
            htmlFor="title"
            className={`form-control ${
              taskToCreate ? "w-full" : "w-11/12 mr-[0.5rem]"
            }`}
          >
            <div className="label pb-0">
              <span className="label-text">Titre</span>
            </div>
            <input
              type="text"
              name="title"
              id="title"
              value={taskFormated?.title}
              onChange={onChange}
              required
              className="input input-bordered w-full"
            />
          </label>
          {!taskToCreate ? (
            <button
              type="button"
              onClick={() =>
                confirmModal.open(formModal.taskID, taskFormated?.title)
              }
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
            value={taskFormated?.description}
            onChange={onChange}
            className="textarea textarea-bordered resize-none h-48"
          ></textarea>
        </label>
        <div className="flex justify-center">
          <input
            type="submit"
            value="Valider"
            className="btn btn-neutral btn-wide mt-4 justify-end"
          />
        </div>
      </form>
    </>
  );
}
