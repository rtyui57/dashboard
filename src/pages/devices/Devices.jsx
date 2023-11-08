import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import "./devices.scss";
import ListDevices from "../../components/devices/list/ListDevices";
import DeviceDetails from "../../components/devices/details/DeviceDetails";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../login/CookieManager";
import "react-toastify/dist/ReactToastify.css";

export default function Devices() {

  const { category } = useParams();
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    getDevices();
  }, []);

  if (getUser() === undefined && window.location.pathname !== "/login") {
    window.location.href = "/login";
    return null;
  }

  function getDevices() {
  }

  function setDevice(device) {
    setSelectedDevice(device);
  }

  return (
    <div className="home">
      <ToastContainer />
      <Sidebar />
      <div className="homeContainer">
        <div className="users">
          <ListDevices devices={devices} selectDevice={setDevice} />
          <DeviceDetails
            device={selectedDevice}
            setDevice={setDevice}
            getDevices={getDevices}
          />
        </div>
      </div>
    </div>
  );
}
