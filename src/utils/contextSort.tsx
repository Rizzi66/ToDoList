import React, { useState, createContext } from "react";
import TaskModel from "../models/TaskModel";

export interface SortContextType {
  onSort: (option: string, tasks: TaskModel[]) => TaskModel[];
  isSortAscending: boolean;
  sortOption: string;
  setIsSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortContext = createContext<SortContextType | null>(null);

export const SortProvider = ({ children }: any) => {
  const [isSortAscending, setIsSortAscending] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("dueDate");

  const dateSort = (a: Date, b: Date): number => {
    const aSort = a ? new Date(a).getTime() : 0;
    const bSort = b ? new Date(b).getTime() : 0;
    return aSort - bSort;
  };

  const statusSort = (a: TaskModel, b: TaskModel): number => {
    if (a.statut < b.statut) return -1;
    if (a.statut > b.statut) return 1;
    return 0;
  };

  const onSort = (option: string, tasks: TaskModel[]): TaskModel[] => {
    const taskSorted = [...tasks].sort((a, b) => {
      let numberSort: number = 0;
      switch (option) {
        case "status": {
          numberSort = statusSort(a, b);
          if (numberSort === 0) {
            numberSort = dateSort(a.date_expiration!, b.date_expiration!);
            if (numberSort === 0) {
              numberSort = -dateSort(a.date_creation!, b.date_creation!);
            }
          }
          return numberSort;
        }
        case "dueDate": {
          numberSort = dateSort(a.date_expiration!, b.date_expiration!);
          return isSortAscending ? numberSort : -numberSort;
        }
        case "createDate": {
          numberSort = dateSort(a.date_creation!, b.date_creation!);
          return isSortAscending ? -numberSort : numberSort;
        }
      }
      return 0;
    });
    setSortOption(option);
    return taskSorted;
  };

  return (
    <SortContext.Provider
      value={{
        onSort,
        isSortAscending,
        sortOption,
        setIsSortAscending,
      }}
    >
      {children}
    </SortContext.Provider>
  );
};
