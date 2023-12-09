import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AxiosController() {
  const { token } = useAuth();

  const controller = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      common: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
  });
  return controller;
}
