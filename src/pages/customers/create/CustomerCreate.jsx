import Sidebar from "../../../components/sidebar/Sidebar";
import Axios from "axios";
import { useEffect, useState } from "react";
import "./customerCreate.scss";
import defaultIcon from "../../../utils/DefaultVars";
import { useNavigate } from "react-router-dom";
import { getCustomer } from "../../login/CookieManager";

function CustomerCreate() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    name: "",
    password: "",
    description: "",
    icon: defaultIcon(),
  });

  const [imageSrc, setImageSrc] = useState(userData.icon);

  if (getCustomer() === undefined && window.location.pathname !== '/login') {
    window.location.href = '/login';
    return null;
  }

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Llego a " + file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        setImageSrc(base64Image);

        // Actualiza el userData con la imagen en formato base64
        setUserData({
          ...userData,
          icon: base64Image,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado de acuerdo a los cambios en los campos de entrada
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveClick = () => {
    // Realiza una llamada API para guardar los cambios en los datos del usuario
    Axios.post("http://localhost:8080/user/customer", userData)
      .then(() => {
        console.log(""); 
        navigate("/customers")// Desactiva el modo de edición después de guardar los cambios
      })
      .catch((error) => {
        console.error("Error al guardar los cambios del usuario:", error);
      });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="user-profile-container">
          <h1>New Customer</h1>
          <div className="user-image">
            <img
              src={userData.icon}
              alt="Imagen de usuario"
              onClick={handleImageClick}
              style={{ cursor: "pointer" }}
            />
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <label>Descripción:</label>
            <textarea
              name="description"
              value={userData.description}
              onChange={handleInputChange}
              className="input-field"
            />
            <br />
            <div className="buttons">
              <button onClick={handleSaveClick} className="save">
                Create Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerCreate;
