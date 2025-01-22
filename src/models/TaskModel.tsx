import { TaskFormatedType } from "../components/TaskForm";

export default interface TaskModel {
  id: number;
  titre: string;
  description: string;
  date_creation?: Date;
  date_expiration?: Date;
  statut: string;
}

export function transformTask(task: TaskFormatedType): TaskModel {
  return {
    id: task.id,
    titre: task.title,
    description: task.description,
    date_creation: task.dateCreate ? new Date(task.dateCreate) : undefined,
    date_expiration: task.dateExp ? new Date(task.dateExp) : undefined,
    statut: task.status,
  };
}

export function transformModifyTask(task: TaskFormatedType): TaskModel {
  return {
    id: task.id,
    titre: task.title,
    description: task.description,
    date_expiration: task.dateExp ? new Date(task.dateExp) : undefined,
    statut: task.status,
  };
}
