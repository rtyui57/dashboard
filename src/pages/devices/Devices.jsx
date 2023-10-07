import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getCustomer } from "../login/CookieManager";
import "./devices.scss";
import ListDevices from "../../components/devices/ListDevices";
import DeviceDetails from "../../components/devices/DeviceDetails";

export default function Devices() {

  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    getDevices();
  }, []);

  if (getCustomer() === undefined && window.location.pathname !== "/login") {
    window.location.href = "/login";
    return null;
  }

  function getDevices() {
    Axios.get("http://localhost:8080/device/list", {
      headers: { customer: getCustomer() },
    })
      .then((res) => {
        console.log(res.data);
        setDevices(res.data);
      })
      .catch((error) => console.log(error));
  }

  function setDevice(device) {
    setSelectedDevice(device)
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="users">
          <ListDevices devices={devices} selectDevice={setDevice}/>
          <DeviceDetails device={selectedDevice} setDevice={setDevice} getDevices={getDevices}/>
        </div>
      </div>
    </div>
  );
}
