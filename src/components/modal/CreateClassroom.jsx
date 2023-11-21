function CreateClassroom({ modalIsOpen, handleCloseModal, building }) {
  return (
    <Modal
      className="modalStyle"
      isOpen={modalIsOpen}
      onRequestClose={() => handleCloseModal()}
      contentLabel="Example Modal"
    >
      <form action="">
        <div className="">
          
        </div>
      </form>
    </Modal>
  );
}

export default CreateClassroom;
