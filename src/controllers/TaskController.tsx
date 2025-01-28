import { TaskFormatedType } from "../components/TaskEdit";
import TaskModel, {
  transformModifyTask,
  transformTask,
} from "../models/TaskModel";

export class TaskController {
  static async getTasks(): Promise<TaskModel[]> {
    try {
      const response = await fetch("http://localhost:3004/task");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des tâches.");
      }
      const tasks: TaskModel[] = await response.json();
      return tasks;
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }

  static async getTasksbyStatus(status: string): Promise<TaskModel[]> {
    try {
      const response = await fetch(
        `http://localhost:3004/task/status/${status}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des tâches.");
      }
      const tasks: TaskModel[] = await response.json();
      return tasks;
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }

  static async getTask(id: number): Promise<TaskModel> {
    try {
      const response = await fetch(`http://localhost:3004/task/${id}`);
      if (!response.ok) {
        throw new Error(`Erreur lors de la récupération de la tâche n°${id}.`);
      }
      const task: TaskModel[] = await response.json();
      return task[0];
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }

  static async createTask(taskCreated: TaskFormatedType): Promise<TaskModel> {
    try {
      const taskToFetch = transformTask(taskCreated);
      const response = await fetch("http://localhost:3004/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskToFetch),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la création de la tâche.");
      }
      const task: TaskModel = await response.json();
      return task;
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }

  static async modifyTask(
    id: number,
    taskModify: TaskFormatedType
  ): Promise<TaskModel> {
    try {
      const taskToFetch = transformModifyTask(taskModify);
      console.log(taskToFetch);
      const response = await fetch(`http://localhost:3004/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskToFetch),
      });
      if (!response.ok) {
        throw new Error(`Erreur lors de la modification de la tâche n°${id}.`);
      }
      const task: TaskModel = await response.json();
      return task;
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }

  static async deleteTask(id: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:3004/task/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression de la tâche n°${id}.`);
      }
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }
}
