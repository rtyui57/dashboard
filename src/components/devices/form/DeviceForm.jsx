import { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "../details/deviceDetails.scss";
import { CustomerContext } from "../../../context/userContext";

const DeviceForm = ({ device, setDevice, getDevices }) => {
  const [localDevice, setLocalDevice] = useState(device ? { ...device } : null);
  const { value } = useContext(CustomerContext);

  useEffect(() => {
    if (device !== null) {
      setLocalDevice(device);
    }
  }, [device]);

  function saveDevice() {
    Axios.post("http://localhost:8080/device/create", localDevice, {
      headers: { customer: value },
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
    setLocalDevice({ ...localDevice, [name]: value });
  }

  if (localDevice == null) {
    return <div className="asa">Select Device Pleaase</div>;
  } else if (localDevice.action === "createNewDevice") {
    setLocalDevice({ name: "", description: "", category: ""});
  } else {
    return (
      
      <form className="inputs">
        <div className="wrapinput">
          <p className="text-green-400">Name</p>
          <input
            type="text"
            name="name"
            value={localDevice.name === null ? "" : localDevice.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>Description</p>
          <input
            type="text"
            name="description"
            value={localDevice.description === null ? "" : localDevice.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>Last Use Date</p>
          <input
            type="text"
            name="creationDate"
            value={localDevice.creationDate === null ? "" : localDevice.creationDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="wrapinput">
          <p>Category</p>
          <input
            type="text"
            name="category"
            value={localDevice.category === null ? "" : localDevice.category}
            onChange={handleInputChange}
          />
        </div>
        <div className="buttons">
          <button className="save" onClick={() => saveDevice(localDevice)}>
            Guardar Cambios
          </button>
          <button className="delete" onClick={() => deleteDevice(device)}>
            Borrar
          </button>
        </div>
      </form>
    );
  }
};

export default DeviceForm;
