import defaultIcon from "../../../utils/DefaultVars";

const ListDevices = ({ devices, selectDevice }) => {

  function registerDevice() {
    const newDevice = { action: "createNewDevice", name: "newOne" };
    selectDevice(newDevice);
  }

  return (
    <div className="devicesContainer">
      <div className="actions">List of devices</div>
      <div className="usersList">
        <button className="create" onClick={registerDevice}>+</button>
        <button className="remove">-</button>
        {devices.map((device) => (
          <a>
            <div className="userListInfo">
              <div className="logo">
                <img src={defaultIcon()}></img>
              </div>
              <div className="nombre">{device.name}</div>
              <button
                className="boton-con-svg"
                onClick={() => {
                  selectDevice(device);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle id={device.name} cx="12" cy="11" r="10" />
                </svg>
              </button>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ListDevices;
