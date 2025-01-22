import React, { useState, createContext } from "react";
import TaskModel from "../models/TaskModel";

export interface TaskContextType {
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
}

export const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: any) => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
