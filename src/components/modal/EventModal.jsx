import Modal from "react-modal";
import Attendance from "../attendance/Attendance";

function EventModal({ modalIsOpen, handleCloseModal, eventData }) {
  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <button
        className="border-lime-500 text-xl to-red-400"
        onClick={() => handleCloseModal()}
      >
        X
      </button>
      <Attendance eventData={eventData} />
    </Modal>
  );
}

export default EventModal;
