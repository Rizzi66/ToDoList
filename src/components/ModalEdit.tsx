import Modal from "react-modal";
import TaskEdit from "./TaskEdit";
import { useModalContext } from "../utils/hook";

export default function ModalEdit() {
  const formModal = useModalContext("form");

  return (
    <Modal
      isOpen={formModal.isOpen}
      onRequestClose={formModal.close}
      overlayClassName="modal modal-open"
      className="modal-box max-w-[48rem]"
      ariaHideApp={false}
    >
      <TaskEdit />
    </Modal>
  );
}
