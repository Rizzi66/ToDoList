import { TaskController } from "../controllers/TaskController";
import { useModalContext } from "../utils/hook";
import Button from "./Button";
import Loading from "./Loading";
import "./TaskForm.scss";
import { useEffect, useState } from "react";

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
    console.log(taskModified);
    await TaskController.modifyTask(id, taskModified);
    window.location.reload();
  }

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <form onSubmit={onSubmit}>
        <header>
          <div>
            <select
              name="status"
              id="status"
              value={taskFormated?.status}
              onChange={onChange}
            >
              <option value="A faire">À faire</option>
              <option value="En cours">En cours</option>
              <option value="Terminee">Terminée</option>
            </select>
            <div>
              ...
              <h2>{taskFormated?.id}</h2>
              <Button
                onClick={() => confirmModal.open(formModal.taskID)}
                text="Supprimer"
              ></Button>
            </div>
            <button type="button" onClick={formModal.close}>
              x
            </button>
          </div>
        </header>
        <div>
          <p>Date de création :</p>
          <p>{taskFormated?.dateCreate}</p>
        </div>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          value={taskFormated?.title}
          onChange={onChange}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          value={taskFormated?.description}
          onChange={onChange}
        ></textarea>
        <label htmlFor="dateExp">Date d'expiration</label>
        <input
          type="date"
          name="dateExp"
          id="dateExp"
          value={taskFormated?.dateExp}
          onChange={onChange}
        />
        <input type="submit" value="Valider" />
      </form>
    </>
  );
}
