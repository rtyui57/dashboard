import { useState } from "react";
import Axios from "axios";
import "./deviceDetails.scss";
import { getCustomer } from "../../../pages/login/CookieManager";
import DeviceForm from "../form/DeviceForm";

const DeviceDetails = ({ device, setDevice, getDevices }) => {
  const [userView, setUserView] = useState("details");

  function setCurrentView(view) {
    setUserView(view);
  }

  function getStats() {
    return (
      <div className="stats">
        <iframe
          src="http://192.168.0.16:3001/d/c0fb77bc-9055-431a-83d9-0d9f74ca3d24/jvm-micrometer?orgId=1&refresh=30s&from=1696619467115&to=1696705867115&viewPanel=111"
          height="900px"
          width="900px"
          frameborder="0"
        ></iframe>
      </div>
    );
  }

  return (
    <div className="deviceDetails">
      <div className="selector">
        <button onClick={() => setCurrentView("details")}>Details</button>
        <button onClick={() => setCurrentView("stats")}>Stats</button>
      </div>
      {userView === "details" ? (
        <DeviceForm
          device={device}
          setDevice={setDevice}
          getDevices={getDevices}
        />
      ) : (
        getStats()
      )}
    </div>
  );
};

export default DeviceDetails;
