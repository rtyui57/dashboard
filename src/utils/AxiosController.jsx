import axios from "axios";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config";
export default function AxiosController() {

  const { token } = useAuth();
  const controller = axios.create({
    baseURL: API_URL,
    headers: {
      common: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    },
  });
  return controller;
}
