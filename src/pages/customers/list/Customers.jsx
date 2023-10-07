import Customer from "../../../components/customer/Customer";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./customers.scss";
import { getCustomer } from "../../login/CookieManager";

const Customers = () => {
  
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/user/customer/list")
      .then((res) => setCustomers(res.data))
      .catch((error) => console.log(error));
  }, []);

  if (getCustomer() === undefined && window.location.pathname !== '/login') {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="customers">
          {customers.map((cust, index) => (
            <Link to={`/customer/${cust.name}`}  style={{ textDecoration: "none" }}>
              <Customer
                name={cust.name}
                description={cust.description}
                icon={cust.icon}
                devices={127}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Customers;
