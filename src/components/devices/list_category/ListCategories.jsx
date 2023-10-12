import { getCustomer } from "../../../pages/login/CookieManager";
import "./listCategories.scss";
import Sidebar from "../../sidebar/Sidebar";
import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const ListDeviceCategories = ({ devices, selectDevice }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    Axios.get("http://localhost:8080/device/categories", {
      headers: { customer: getCustomer() },
    })
      .then((res) => {
        setCategories(res.data);
        toast.info("Categorias recuperdas", {
          position: "bottom-right",
          autoClose: 3000,
        });
      })
      .catch((error) =>
        toast.error(error.message, {
          position: "bottom-right",
          autoClose: 3000,
        })
      );
  }
  return (
    <div className="home">
      <ToastContainer />
      <Sidebar />
      <div className="homeContainer">
        <div className="categories">
          {categories.map((category) => (
            <Link
              to={`/devices/${category}`}
              style={{ textDecoration: "none" }}
            >
              <div className="category_container">{category}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListDeviceCategories;
