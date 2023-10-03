import './customer.scss';

const Customer = (customer) => {
  console.log(customer)
  return <div className="customer">
  <div className="image">
  <img src={customer.icon} alt="Foto de perfil" />
  </div>
  <div className="customer-info">
    <h2>{customer.name}</h2>
    <p>{customer.description}</p>
    <p>Devices: {customer.devices}</p>
  </div>
</div>
};

export default Customer;
