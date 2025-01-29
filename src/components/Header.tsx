import ModalEdit from "./ModalEdit.tsx";
import { useModalContext } from "../utils/hook";
import ModalConfirm from "./ModalConfirm.tsx";
import { NavLink } from "react-router-dom";
import SortTask from "./SortTask.tsx";
import Logo from "../assets/Logo.svg.tsx";
import Add from "../assets/Add.svg";

export default function Header() {
  const formModal = useModalContext("form");

  return (
    <>
      <header className="flex flex-col justify-between mx-0 m-5 mb-6 lg:flex-row lg:mx-5">
        <h1 className="flex flex-row text-2xl sm:text-4xl font-bold text-center mt-0 mb-[1.5rem] mx-4 text-primary underline justify-center lg:justify-start lg:ml-6 lg:m-4 lg:pt-2 lg:pl-2">
          <Logo />
          To-Do List
        </h1>
        <nav>
          <ul className="menu gap-2 bg-base-200 w-full lg:w-56 flex-row lg:flex-col justify-between lg:justify-start *:w-[48%] *:sm:w-[24%] *:lg:w-full *:*:justify-center *:*:lg:justify-start">
            <li>
              <NavLink to="/">Toutes les tâches</NavLink>
            </li>
            <li>
              <NavLink to="/todo">À faire</NavLink>
            </li>
            <li>
              <NavLink to="/current">En Cours</NavLink>
            </li>
            <li>
              <NavLink to="/done">Terminée</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <ModalEdit />
      <ModalConfirm />
      <div className="flex flex-row lg:absolute lg:translate-y-[-105%]">
        <button
          type="button"
          onClick={() => formModal.open(null)}
          className="btn btn-md btn-neutral m-4 mr-2 mt-0 lg:mt-4 sm:btn sm:btn-neutral text-[0.8rem] sm:text-[0.875rem]"
        >
          <Add />
          Ajouter une tâche
        </button>
        <SortTask />
      </div>
    </>
  );
}
