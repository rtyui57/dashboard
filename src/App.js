import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./data/formSource";
import "./style/dark.scss";
import "./index.css";
import Users from "./pages/users/Users";
import UserDetails from "./components/users/UserDetails";
import Buildings from "./pages/buildings/Buildings";
import BuildingsView from "./pages/buildings/BuildingsView";
import UserCalendar from "./pages/users/calendar/UserCalendar";
import Sidebar from "./components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import Calendar from "./components/calendar/Calendar";
import Asignaturas from "./pages/asignaturas/Asignaturas";
import Notificaciones from "./pages/notificaiones/Notificaciones";
import AsignaturaView from "./pages/asignaturas/AsignaturaView";

function App() {
  return (
    <BrowserRouter>
      <div className="home">
        <Sidebar />
        <ToastContainer />
        <div className="homeContainer">
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
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
                <Route path=":building" element={<BuildingsView />} />
              </Route>
              <Route path="calendario" element={<Calendar events={[]} />} />
              <Route path="asignaturas">
                <Route index element={<Asignaturas />} />
                <Route path=":asignatura" element={<AsignaturaView />} />
              </Route>
              <Route
                path="notifications"
                element={<Notificaciones events={[]} />}
              />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
