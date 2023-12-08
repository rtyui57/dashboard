import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AxiosController() {
  const { getAuth } = useAuth();

  const controller = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      common: {
        Authorization: "Bearer " + getAuth(),
        "Content-Type": "application/json",
      },
    },
  });
  return controller;
}
