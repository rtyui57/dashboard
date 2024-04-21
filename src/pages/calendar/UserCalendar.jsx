import Calendar from "../../components/calendar/Calendar";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import AxiosController from "../../utils/AxiosController";
import { toast } from "react-toastify";

export default function PersonalCalendar() {
  const [events, setEvents] = useState([]);
  const [key, setKey] = useState(1);
  const { username } = useAuth();
  const axiosController = AxiosController();

  useEffect(() => {
    axiosController
      .get(`/user/${username}/horario`)
      .then((res) => {
        setEvents(res.data);
        console.log(res.data)
      })
      .catch((err) =>
        toast.error(`Error ${err.response.status}: ${err.response.data}`)
      );
  }, [key]);
  return (
    <div className="">
      <Calendar events={events} setKey={setKey} key={key}/>
    </div>
  );
}
