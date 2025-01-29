import React, { useState, createContext, ReactNode } from "react";
import TaskModel from "../models/TaskModel";

export interface SortContextType {
  onSort: (option: string, tasks: TaskModel[]) => TaskModel[];
  isSortAscending: boolean;
  sortOption: string;
  setIsSortAscending: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SortContext = createContext<SortContextType | null>(null);

export const SortProvider = ({ children }: { children: ReactNode }) => {
  const [isSortAscending, setIsSortAscending] = useState<boolean>(true);
  const [sortOption, setSortOption] = useState<string>("dueDate");

  const dateSort = (a: string | undefined, b: string | undefined): number => {
    const aSort = a ? new Date(a).getTime() : 0;
    const bSort = b ? new Date(b).getTime() : 0;
    return aSort - bSort;
  };

  const statusSort = (a: string, b: string): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const onSort = (option: string, tasks: TaskModel[]): TaskModel[] => {
    const taskSorted = [...tasks].sort((a, b) => {
      let numberSort: number = 0;
      switch (option) {
        case "status": {
          numberSort = statusSort(a.status, b.status);
          if (numberSort === 0) {
            numberSort = dateSort(a.dateExp, b.dateExp);
            if (numberSort === 0) {
              numberSort = -dateSort(a.dateCreate, b.dateCreate);
            }
          }
          return numberSort;
        }
        case "dueDate": {
          numberSort = dateSort(a.dateExp, b.dateExp);
          return isSortAscending ? numberSort : -numberSort;
        }
        case "createDate": {
          numberSort = dateSort(a.dateCreate, b.dateCreate);
          return isSortAscending ? -numberSort : numberSort;
        }
      }
      return 0;
    });
    setSortOption(option);
    return taskSorted;
  };

  return (
    <SortContext.Provider value={{ onSort, isSortAscending, sortOption, setIsSortAscending }}>
      {children}
    </SortContext.Provider>
  );
};
