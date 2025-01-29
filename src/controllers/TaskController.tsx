import TaskModel from "../models/TaskModel";
const urlBackend = import.meta.env.VITE_URL_BACKEND;

export class TaskController {
  static async getTasks(): Promise<any> {
    try {
      const response = await fetch(urlBackend);
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

  static async getTasksbyStatus(status: string): Promise<any> {
    try {
      const response = await fetch(`${urlBackend}/status/${status}`);
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

  static async getTask(id: number): Promise<any> {
    try {
      const response = await fetch(`${urlBackend}/${id}`);
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

  static async createTask(taskCreated: TaskModel): Promise<TaskModel> {
    try {
      const taskToFetch = TaskModel.sendTask(taskCreated);
      const response = await fetch(`${urlBackend}/task`, {
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

  static async modifyTask(id: number, taskModify: TaskModel): Promise<TaskModel> {
    try {
      const taskToFetch = TaskModel.sendTask(taskModify);
      const response = await fetch(`${urlBackend}/${id}`, {
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
      const response = await fetch(`${urlBackend}/${id}`, {
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
