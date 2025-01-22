import "./Task.scss";
import Button from "./Button";
import { useModalContext } from "../utils/hook";
import TaskModel from "../models/TaskModel";

export default function Task({ task }: { task: TaskModel }) {
  const formModal = useModalContext("form");
  const confirmModal = useModalContext("confirm");

  return (
    <div className="task">
      <div>{task.statut}</div>
      <div>{task.titre}</div>
      <div className="task__desc">{task.description}</div>
      <div>
        {task.date_expiration
          ? new Date(task.date_expiration).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Date non définie"}
      </div>
      <div>{task.id}</div>
      <div>
        {task.date_creation
          ? new Date(task.date_creation).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Date non définie"}
      </div>
      <Button onClick={() => formModal.open(task.id)} text="Modifier"></Button>
      <Button
        onClick={() => confirmModal.open(task.id)}
        text="Supprimer"
      ></Button>
    </div>
  );
}
