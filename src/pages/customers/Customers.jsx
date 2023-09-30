import Customer from "../../components/customer/Customer";
import '../home/home.scss'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget";
import { Table } from "@mui/material";

const Customers = ({ customers }) => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Customer/>
          <Customer/>
          <Customer/>
        </div>
        <div className="charts">
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>)
};

export default Customers;
