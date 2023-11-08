import "./customer.scss";
import { setCustomer } from "../../pages/login/CookieManager";

const Customer = (customer) => {
  return (
    <div className="customer">
      <div className="image">
        <img src={customer.icon} alt="Foto de perfil" />
      </div>
      <div className="customer-info">
        <h2>{customer.name}</h2>
        <p>{customer.description}</p>
        <p>Devices: {customer.devices}</p>
      </div>
      <button
        onClick={() => {
          setCustomer(customer.name, 15);
        }}
      >
        Select
      </button>
    </div>
  );
};

export default Customer;
