import "./TaskSort.scss";
import { useSortContext, useTaskContext } from "../utils/hook";
import { useEffect } from "react";

export default function TaskSort() {
  const { onSort, isSortAscending, sortOption, setIsSortAscending } =
    useSortContext();
  const { tasks, setTasks } = useTaskContext();

  const clickOnSort = (option: string): void => {
    const taskSorted = onSort(option, tasks);
    setTasks(taskSorted);
  };

  useEffect(() => {
    const taskSorted = onSort(sortOption, tasks);
    setTasks(taskSorted);
  }, [isSortAscending]);

  return (
    <div className="sort">
      <button
        className={sortOption === "status" ? "active" : ""}
        onClick={() => clickOnSort("status")}
      >
        tri par statut
      </button>
      <button
        className={sortOption === "dueDate" ? "active" : ""}
        onClick={() => clickOnSort("dueDate")}
      >
        tri par date d'échéance
      </button>
      <button
        className={sortOption === "createDate" ? "active" : ""}
        onClick={() => clickOnSort("createDate")}
      >
        tri par date de création
      </button>
      <button
        className={
          sortOption !== "status" ? (isSortAscending ? "active" : "") : ""
        }
        onClick={() => {
          setIsSortAscending(true);
        }}
      >
        du plus récent au plus vieux
      </button>
      <button
        className={
          sortOption !== "status" ? (isSortAscending ? "" : "active") : ""
        }
        onClick={() => {
          setIsSortAscending(false);
        }}
      >
        du plus vieux au plus récent
      </button>
    </div>
  );
}
