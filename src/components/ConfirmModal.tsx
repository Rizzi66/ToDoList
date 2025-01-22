import Modal from "react-modal";
import "./ConfirmModal.scss";
import { useModalContext } from "../utils/hook";
import { TaskController } from "../controllers/TaskController";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "grey",
  },
};

export default function ConfirmModal() {
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
      // onAfterOpen={afterOpenModal}
      onRequestClose={confirmModal.close}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div>Voulez-vous supprimer la tâche "{confirmModal.taskID}" ?</div>
      <div>
        <button onClick={() => deleteTask(confirmModal.taskID)}>Oui</button>
        <button onClick={confirmModal.close}>Non</button>
      </div>
    </Modal>
  );
}
