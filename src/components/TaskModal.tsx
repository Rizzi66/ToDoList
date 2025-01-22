import Modal from "react-modal";
import "./TaskModal.scss";
import TaskForm from "./TaskForm";
import { useModalContext } from "../utils/hook";

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

export default function TaskModal() {
  const formModal = useModalContext("form");

  return (
    <Modal
      isOpen={formModal.isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={formModal.close}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <TaskForm />
    </Modal>
  );
}
