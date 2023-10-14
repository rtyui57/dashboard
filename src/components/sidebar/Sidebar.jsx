import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { CustomerContext } from "../../context/userContext";

const SideBarIcon = ({ icon, link, desc = "Hola" }) => {
  return (
    <div className="cover group">
      <span className="scale-0 group-hover:scale-100 sidebar-tooltip">
        {desc}
      </span>
      <Link to={link} style={{ textDecoration: "none" }}>
        {icon}
      </Link>
    </div>
  );
};

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(CustomerContext);

  return (
    <div className="sidebar bg-gray-800">
      <div className="center">
        <SideBarIcon icon={<DashboardIcon />} link="/" desc="Home" />
        <SideBarIcon icon={<PersonOutlineIcon />} link="/users" desc="Users" />
        {user === "customer" && (
          <SideBarIcon icon={<StoreIcon />} link="/customers" desc="Customer" />
        )}
        <SideBarIcon
          icon={<InsertChartIcon />}
          link="/devices/categories"
          desc="Devices"
        />
        <SideBarIcon
          icon={<AccountCircleOutlinedIcon />}
          link="/"
          desc="Nada"
        />
        <SideBarIcon icon={<ExitToAppIcon />} link="/login" desc="LogOut" />
      </div>
    </div>
  );
};

export default Sidebar;
