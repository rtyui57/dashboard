import Modal from "react-modal";
import Attendance from "../attendance/Attendance";

function EventModal() {
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
     
      <Attendance
        fecha="Fecha: 2032-09-78"
        nombre="Fisica"
        ocupacion="80/980"
        asistentes={[
          "as",
          "sfsadjfkldasjf",
          "adad",
          "as",
          "sfsadjfkldasjf",
          "adad",
        ]}
        ausentes={["as", "sfsadjfkldasjf", "adad"]}
      />
      
    </Modal>
  );
}

export default EventModal;
