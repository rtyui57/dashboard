import { useState } from "react";
import Axios from "axios";
import "./deviceDetails.scss";
import { getCustomer } from "../../pages/login/CookieManager";

const DeviceDetails = ({ device, setDevice, getDevices }) => {
  const [userView, setUserView] = useState("details");

  function setCurrentView(view) {
    setUserView(view);
  }

  function saveDevice(device) {
    console.log(device);
    Axios.post("http://localhost:8080/device/create", device, {
      headers: { customer: getCustomer() },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    getDevices();
  }

  function deleteDevice(device) {
    Axios.delete(`http://localhost:8080/device/${device.name}/remove`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    getDevices();
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setDevice({ ...device, [name]: value });
  }

  function getDetails() {
    if (device == null) {
      return <div className="asa">Select Device Pleaase</div>;
    } else {
      return (
        <form className="inputs">
          <div className="wrapinput">
            <p>Name</p>
            <input
              type="text"
              name="name"
              value={device.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Description</p>
            <input
              type="text"
              name="description"
              value={device.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Last Use Date</p>
            <input
              type="text"
              name="creationDate"
              value={device.creationDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="wrapinput">
            <p>Category</p>
            <input
              type="text"
              name="category"
              value={device.category}
              onChange={handleInputChange}
            />
          </div>
          <div className="buttons">
            <button className="save" onClick={() => saveDevice(device)}>
              Guardar Cambios
            </button>
            <button className="delete" onClick={() => deleteDevice(device)}>
              Borrar
            </button>
          </div>
        </form>
      );
    }
  }

  function getStats() {
    return (
      <div className="stats">
        <iframe
          src="http://localhost:3001/d-solo/ca98f1ad-6cdc-4e67-b035-2cbc76f49ad8/jvm-micrometer?orgId=1&refresh=30s&from=1696610512169&to=1696696912169&panelId=111"
          width="850"
          height="700"
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
      {userView === "details" ? getDetails() : getStats()}
    </div>
  );
};

export default DeviceDetails;
