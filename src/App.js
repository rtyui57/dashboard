import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./data/formSource";
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
const SOCKET_URL = "http://localhost:8080/ws-message";

function App() {

  const { addMessage } = useNotifications();
  let onConnected = () => console.log("Connected!!");

  return (
    <BrowserRouter>
      <div className="home">
        <Sidebar />
        <ToastContainer />
        <SockJsClient
          url={SOCKET_URL}
          topics={["/topic/message"]}
          onConnect={onConnected}
          onDisconnect={console.log("Disconnected!")}
          onMessage={(msg) => addMessage(msg)}
          debug={false}
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
                  <Route
                    path="new"
                    element={<New inputs={userInputs} title="Add New User" />}
                  />
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
