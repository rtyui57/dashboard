import "./home.scss";
import { useAuth } from "../../context/AuthContext";
import Asignaturas from "../asignaturas/Asignaturas";
const Home = () => {

  const { getUsername } = useAuth();
  return (
    <Asignaturas/>
  );
};

export default Home;
