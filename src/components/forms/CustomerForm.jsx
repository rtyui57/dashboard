import "./customerForm.scss";
import Sidebar from "../sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Axios from "axios";

const url = "http://localhost:8080";
const CustomerForm = () => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({ name: "", id: "", description: "", uiProperties : ""});

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    Axios.post(
      url + "/user/customer",
      {
        id: data.id,
        name: data.name,
        description: data.description,
        uiProperties: data.uiProperties
      },
      { headers: { "Content-Type": "application/json" } }
    ).then((res) => console.log(res));
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top">
          <h1 className="title">Add New Customer</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={(e) => submit(e)}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="file">Image:</label>
              </div>
              <div className="formInput">
                <label>Customer Name: </label>
                <input
                  onChange={(e) => handle(e)}
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={data.name}
                />
              </div>
              <div className="formInput">
                <label>Customer Id: </label>
                <input
                  onChange={(e) => handle(e)}
                  type="text"
                  id="id"
                  placeholder="Id"
                  value={data.id}
                />
              </div>
              <div className="formInput">
                <label>Customer Description: </label>
                <input
                  onChange={(e) => handle(e)}
                  type="text"
                  id="description"
                  placeholder="Id"
                  value={data.description}
                />
              </div>
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
