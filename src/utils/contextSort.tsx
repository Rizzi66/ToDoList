import React, { useState, createContext } from "react";
import TaskModel from "../models/TaskModel";

export interface SortContextType {
  onSort: (option: string, tasks: TaskModel[]) => TaskModel[];
  isSortByStatus: boolean;
  isSortByDueDate: boolean;
  isSortByCreateDate: boolean;
  isSortAscending: boolean;
  sortOption: string;
  setIsSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortContext = createContext<SortContextType | null>(null);

export const SortProvider = ({ children }: any) => {
  const [isSortByStatus, setIsSortByStatus] = useState<boolean>(false);
  const [isSortByDueDate, setIsSortByDueDate] = useState<boolean>(false);
  const [isSortByCreateDate, setIsSortByCreateDate] = useState<boolean>(false);
  const [isSortAscending, setIsSortAscending] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("dueDate");

  const onSort = (option: string, tasks: TaskModel[]) => {
    let taskPreSorted = [...tasks];
    let taskSorted = [...tasks];
    switch (option) {
      case "status": {
        taskPreSorted = [...tasks].sort((a, b) => {
          return (
            new Date(a.date_expiration!).getTime() -
            new Date(b.date_expiration!).getTime()
          );
        });
        taskSorted = [...taskPreSorted].sort((a, b) => {
          if (a.statut < b.statut) return -1;
          if (a.statut > b.statut) return 1;
          return 0;
        });
        setIsSortByStatus(true);
        setIsSortByDueDate(false);
        setIsSortByCreateDate(false);
        setSortOption("status");
        break;
      }
      case "dueDate": {
        console.log("duedate" + isSortAscending);
        taskSorted = [...tasks].sort((a, b) => {
          const sort =
            new Date(a.date_expiration!).getTime() -
            new Date(b.date_expiration!).getTime();
          return isSortAscending ? sort : -sort;
        });
        setIsSortByStatus(false);
        setIsSortByDueDate(true);
        setIsSortByCreateDate(false);
        setSortOption("dueDate");
        break;
      }
      case "createDate": {
        console.log("createDate" + isSortAscending);
        taskSorted = [...tasks].sort((a, b) => {
          const sort = a.id - b.id;
          return isSortAscending ? sort : -sort;
        });
        setIsSortByStatus(false);
        setIsSortByDueDate(false);
        setIsSortByCreateDate(true);
        setSortOption("createDate");
        break;
      }
    }
    return taskSorted;
  };

  return (
    <SortContext.Provider
      value={{
        onSort,
        isSortAscending,
        isSortByCreateDate,
        isSortByDueDate,
        isSortByStatus,
        sortOption,
        setIsSortAscending,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};
