import Sidebar from "../../components/sidebar/Sidebar";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { getCustomer } from "../login/CookieManager";
import { useParams } from "react-router-dom";
import "./devices.scss";
import ListDevices from "../../components/devices/list/ListDevices";
import DeviceDetails from "../../components/devices/details/DeviceDetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Devices() {
  const { category } = useParams();
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
    Axios.get(`http://localhost:8080/device/category/${category}`, {
      headers: { customer: getCustomer() },
    })
      .then((res) => {
        console.log(res.data);
        setDevices(res.data);
        toast.info("Recuperados los devices de la categoria " + category, {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 3000,
        });
      });
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
