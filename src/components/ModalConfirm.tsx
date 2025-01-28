import Modal from "react-modal";
import { useModalContext } from "../utils/hook";
import { TaskController } from "../controllers/TaskController";

export default function ModalConfirm() {
  const confirmModal = useModalContext("confirm");

  async function deleteTask(taskID: number | null) {
    if (confirmModal.taskID !== null) {
      await TaskController.deleteTask(taskID!);
      window.location.reload();
    }
  }

  return (
    <Modal
      isOpen={confirmModal.isOpen}
      onRequestClose={confirmModal.close}
      overlayClassName="modal modal-open"
      className="modal-box"
      ariaHideApp={false}
    >
      <div className="text-center">
        Voulez-vous supprimer la tâche "{confirmModal.taskTitle}" ?
      </div>
      <div className="flex flex-row justify-around">
        <button
          className="btn btn-neutral w-2/5 mt-6"
          onClick={() => deleteTask(confirmModal.taskID)}
        >
          Oui
        </button>
        <button
          className="btn btn-neutral btn-wide w-2/5 mt-6"
          onClick={confirmModal.close}
        >
          Non
        </button>
      </div>
    </Modal>
  );
}
