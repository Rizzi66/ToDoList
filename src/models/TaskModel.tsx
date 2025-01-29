export interface TaskToSend {
  titre: string;
  description: string | undefined;
  date_expiration: Date | undefined;
  statut: string;
}

export default class TaskModel {
  id: number;
  title: string;
  description?: string;
  status: string;
  dateExp?: string;
  dateCreate: string;
  constructor(
    id: number,
    titre: string,
    description: string,
    statut: string,
    date_expiration: Date,
    date_creation: Date
  ) {
    this.id = id;
    this.title = titre;
    this.description = description ? description : "";
    this.status = statut;
    this.dateExp = date_expiration ? date_expiration.toString().split("T")[0] : "";
    this.dateCreate = new Date(date_creation).toLocaleString("fr-FR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  }

  static sendTask(task: TaskModel): TaskToSend {
    return {
      titre: task.title,
      description: task.description,
      date_expiration: task.dateExp ? new Date(task.dateExp) : undefined,
      statut: task.status,
    };
  }
}
