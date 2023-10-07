import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs } from "./data/formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Customers from "./pages/customers/list/Customers";
import CustomerForm from "./components/forms/CustomerForm";
import CustomerView from "./pages/customers/single/CustomerView";
import CustomerCreate from "./pages/customers/create/CustomerCreate";
import Users from "./pages/users/Users";
import Devices from "./pages/devices/Devices";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":userId" element={<CustomerForm />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="customers">
              <Route index element={<Customers />} />
              <Route path="new" element={<CustomerCreate />} />
            </Route>
            <Route path="/customer/:customerId" element={<CustomerView />} />
            <Route path="devices" element={<Devices />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
