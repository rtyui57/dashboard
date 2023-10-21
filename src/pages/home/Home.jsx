import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import { getUser } from "../login/CookieManager";
import Table from "../../components/table/Table";
import { CustomerContext } from "../../context/userContext";
import { useContext } from "react";

const Home = () => {
  const { value } = useContext(CustomerContext);

  if (getUser() === undefined && window.location.pathname !== '/login') {
    window.location.href = '/login';
    return null;
  }
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        {"Customer value with context: " + value + " and user " + getUser()}
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
