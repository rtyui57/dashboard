import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import Axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./customerView.scss";

function CustomerView() {
  const { customerId } = useParams();

  const [userData, setUserData] = useState({
    name: "",
    password: "",
    description: "",
    icon: "",
  });

  const [imageSrc, setImageSrc] = useState(userData.icon || "");

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Llego a " + file)

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

  useEffect(() => {
    Axios.get(`http://localhost:8080/user/customer/${customerId}`)
      .then((response) => {
        setUserData(response.data); // Actualiza el estado con los datos del usuario
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Actualiza el estado de acuerdo a los cambios en los campos de entrada
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveClick = () => {
    // Realiza una llamada API para guardar los cambios en los datos del usuario
    Axios.post("http://localhost:8080/user/customer", userData)
      .then(() => {
        console.log(""); // Desactiva el modo de edición después de guardar los cambios
      })
      .catch((error) => {
        console.error("Error al guardar los cambios del usuario:", error);
      });
  };

  const handleDeleteClick = () => {
    Axios.delete(`http://localhost:8080/user/customer/${customerId}`);
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="user-profile-container">
          <h1>Perfil de Usuario</h1>
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
                Guardar Cambios
              </button>
              <button onClick={handleDeleteClick} className="delete">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerView;
