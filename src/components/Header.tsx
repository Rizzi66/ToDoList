import "./Header.scss";
import TaskModal from "../components/TaskModal";
import Button from "../components/Button";
import { useModalContext } from "../utils/hook";
import ConfirmModal from "../components/ConfirmModal";
import { NavLink } from "react-router-dom";

export default function Header() {
  const formModal = useModalContext("form");

  return (
    <>
      <header>
        <h1>To-Do List</h1>
        <nav>
          <NavLink to="/">Toutes les tâches</NavLink>
          <NavLink to="/todo">À faire</NavLink>
          <NavLink to="/current">En Cours</NavLink>
          <NavLink to="/done">Terminée</NavLink>
        </nav>
        <TaskModal />
        <ConfirmModal />
      </header>
      <div className="add_sort">
        <Button
          onClick={() => formModal.open(null)}
          text="+ Ajouter une tâche"
        />
        <div>Tri des tâches</div>
      </div>
      <div>
        <span>Statut</span>
        <span>Titre</span>
        <span>Description</span>
        <span>Date d'expiration</span>
      </div>
    </>
  );
}
