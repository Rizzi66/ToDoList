import { useModalContext } from "../utils/hook";
import TaskModel from "../models/TaskModel";
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";

export default function Task({ task }: { task: TaskModel }) {
  const formModal = useModalContext("form");
  const confirmModal = useModalContext("confirm");

  const getBorderClass = (status: string) => {
    switch (status) {
      case "A faire":
        return "border-green-500";
      case "En cours":
        return "border-blue-500";
      case "Terminee":
        return "border-gray-500";
    }
  };

  return (
    <tr className="grid grid-cols-[96px_1fr_40px_40px] grid-rows-2 sm:table-row border border-primary box-border hover">
      <td className="row-span-2 p-0 w-16">
        <div
          className={`font-bold px-4 py-8 sm:py-4 whitespace-pre border-l-4 box-content ${getBorderClass(
            task.statut
          )}`}
        >
          {task.statut}
        </div>
      </td>
      <td className="pb-0 pl-0 sm:pb-3 sm:pl-4 col-span-3 max-w-[100%] sm:max-w-60 whitespace-nowrap overflow-hidden text-ellipsis lg:w-2/3">
        {task.titre}
      </td>
      <td className="max-w-60 whitespace-nowrap overflow-hidden text-ellipsis hidden lg:table-cell lg:w-1/3">
        {task.description}
      </td>
      <td className="pb-0 pl-0 sm:pb-3 sm:pl-4 text-center w-10">
        {task.date_expiration
          ? new Date(task.date_expiration).toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : ""}
      </td>
      <td className="pb-0 sm:pb-3 w-0 px-2">
        <button onClick={() => formModal.open(task.id)} className="edit">
          <Edit />
        </button>
      </td>
      <td className="pb-0 sm:pb-3 w-0 px-2">
        <button onClick={() => confirmModal.open(task.id, task.titre)}>
          <Delete />
        </button>
      </td>
    </tr>
  );
}
