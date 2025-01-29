import "./SortTask.scss";
import { useSortContext, useTaskContext } from "../utils/hook";
import { useEffect } from "react";
import Arrow_down from "../assets/Arrow_down.svg";
import Arrow_up from "../assets/Arrow_up.svg";

export default function SortTask() {
  const { onSort, isSortAscending, sortOption, setIsSortAscending } = useSortContext();
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
    <div className="dropdown sm:dropdown-right dropdown-end my-4 pt-4 mt-0 lg:mt-4">
      <div tabIndex={0} role="button" className="btn btn-sm text-[0.8rem] sm:text-[0.875rem] btn-neutral ml-2">
        Trier les tâches
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-64 p-2 shadow">
        <li className="sort_button-ascending">
          <button
            className={`sort_button ${sortOption !== "status" ? (isSortAscending ? "" : "active") : ""}`}
            onClick={() => {
              setIsSortAscending(false);
            }}
            disabled={sortOption === "status"}
          >
            <Arrow_up />
            du plus ancien au plus récent
          </button>
        </li>
        <li className="sort_button-ascending">
          <button
            className={`sort_button ${sortOption !== "status" ? (isSortAscending ? "active" : "") : ""}`}
            onClick={() => {
              setIsSortAscending(true);
            }}
            disabled={sortOption === "status"}
          >
            <Arrow_down />
            du plus récent au plus ancien
          </button>
        </li>
        <li>
          <button
            className={`sort_button sort_button-3 ${sortOption === "createDate" ? "active" : ""}`}
            onClick={() => clickOnSort("createDate")}
          >
            par date de création
          </button>
        </li>
        <li>
          <button
            className={`sort_button ${sortOption === "dueDate" ? "active" : ""}`}
            onClick={() => clickOnSort("dueDate")}
          >
            par date d'échéance
          </button>
        </li>
        <li>
          <button
            className={`sort_button ${sortOption === "status" ? "active" : ""}`}
            onClick={() => clickOnSort("status")}
          >
            par statut
          </button>
        </li>
      </ul>
    </div>
  );
}
