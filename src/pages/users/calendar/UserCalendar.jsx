import Calendar from "../../../components/calendar/Calendar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import EventFormModal from "../../../components/modal/EventFormModal";
import AxiosController from "../../../utils/AxiosController";

function UserCalendar() {
  const { username } = useParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [key, setKey] = useState(1);
  const axios = AxiosController();

  const createEvent = (info) => {
    setModalIsOpen(true);
    document.getElementById("calendario").style.zIndex = "-1";
    document.getElementById("calendario").style.position = "relative";
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    document.getElementById("calendario").style.zIndex = "auto";
    document.getElementById("calendario").style.position = "static";
  };

  function getUserCalendar(username) {
    axios.get(`/user/${username}/horario`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    setEvents(getUserCalendar(username));
  }, [modalIsOpen]);

  return (
    <div>
      <button
        className="w-full text-center text-lg text-fuchsia-500"
        onClick={() => {
          createEvent();
        }}
      >
        Create Event
      </button>
      <EventFormModal
        isOpen={modalIsOpen}
        closeModal={() => {
          handleCloseModal();
        }}
        username={username}
      />
      <Calendar events={events} />
    </div>
  );
}
export default UserCalendar;
