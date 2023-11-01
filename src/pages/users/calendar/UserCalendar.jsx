import Calendar from "../../../components/calendar/Calendar";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

function getUserCalendar() {

}
function UserCalendar() {

  const { username } = useParams();
  const [events, setEvents] = useState([]);
  useEffect(() => {}, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {"Calendario del usuario: " + username}
        <Calendar />
      </div>
    </div>
  );
}

export default UserCalendar;
