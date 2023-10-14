import "./customer.scss";
import { setCustomer } from "../../pages/login/CookieManager";
import { useContext } from "react";
import { CustomerContext } from "../../context/userContext";

const Customer = (customer) => {
  const { value, setCustomerContext } = useContext(CustomerContext);
  console.log(customer);
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
          setCustomerContext(customer.name);
        }}
      >
        Select
      </button>
    </div>
  );
};

export default Customer;
