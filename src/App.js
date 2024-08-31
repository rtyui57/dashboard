import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";
import "./index.css";
import Users from "./pages/users/Users";
import UserDetails from "./components/users/UserDetails";
import Buildings from "./pages/buildings/list/Buildings";
import BuildingsView from "./pages/buildings/BuildingsView";
import UserCalendar from "./pages/users/calendar/UserCalendar";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import SockJsClient from "react-stomp";
import Asignaturas from "./pages/asignaturas/list/Asignaturas";
import Notificaciones from "./pages/notificaiones/Notificaciones";
import AsignaturaView from "./pages/asignaturas/single/AsignaturaView";
import EventView from "./components/event/EventView";
import RequireAuth from "./security/RequireAuth";
import PersonalCalendar from "./pages/calendar/UserCalendar";
import CalendarQR from "./pages/calendar/CalendarQR";
import { useNotifications } from "./context/NotificationsContext";
import API_URL from "./config";

const SOCKET_URL = API_URL + "/ws-message";

function App() {
  const { addMessage } = useNotifications();

  return (
    <BrowserRouter>
      <div className="home">
        <Sidebar />
        <ToastContainer />
        <SockJsClient
          url={SOCKET_URL}
          topics={["/topic/message"]}
          onConnect={console.log("Connected!!" + SOCKET_URL)}
          onDisconnect={(e) => console.log(`Disconnected! ${e}`)}
          onMessage={(msg) => {addMessage(msg); console.log(msg)}}
          debug={true}
        />
        <div className="homeContainer">
          <Routes>
            <Route path="/">
              <Route path="login" element={<Login />} />
              <Route element={<RequireAuth />}>
                <Route index element={<Home />} />
                <Route path="users">
                  <Route index element={<Users />} />
                  <Route path=":username" element={<UserDetails />} />
                  <Route path=":username/horario" element={<UserCalendar />} />
                </Route>
                <Route path="buildings">
                  <Route index element={<Buildings />} />
                  <Route path=":buildingName" element={<BuildingsView />} />
                </Route>
                <Route path="calendario">
                  <Route index element={<PersonalCalendar />} />
                  <Route path=":calendarioId/qr" element={<CalendarQR />} />
                </Route>
                <Route path="asignaturas">
                  <Route index element={<Asignaturas />} />
                  <Route path=":asignaturaName" element={<AsignaturaView />} />
                </Route>
                <Route
                  path="notifications"
                  element={<Notificaciones events={[]} />}
                />
              </Route>
              <Route path="event/:eventId" element={<EventView />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
