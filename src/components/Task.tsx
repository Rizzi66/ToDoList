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
      <div>{task.date_expiration?.toString()}</div>
      <Button onClick={() => formModal.open(task.id)} text="Modifier"></Button>
      <Button
        onClick={() => confirmModal.open(task.id)}
        text="Supprimer"
      ></Button>
    </div>
  );
}
