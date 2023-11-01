import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { CustomerContext } from "../../context/userContext";
import { getUser } from "../../pages/login/CookieManager";
import DomainIcon from "@mui/icons-material/Domain";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

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
    <div className="sidebar">
      <div className="icons_container">
        <div className="top_icons">
          <SideBarIcon icon={<DashboardIcon />} link="/" desc="Home" />
          <SideBarIcon
            icon={<PersonOutlineIcon />}
            link="/users"
            desc="Users"
          />
          {getUser() === "admin" && (
            <SideBarIcon
              icon={<StoreIcon />}
              link="/customers"
              desc="Customer"
            />
          )}
          <SideBarIcon
            icon={<NotificationsActiveIcon />}
            link="/devices/categories"
            desc="Devices"
          />
          <SideBarIcon
            icon={<CalendarMonthIcon />}
            link="/"
            desc="Calendario"
          />
          <SideBarIcon icon={<DomainIcon />} link="/buildings" desc="Aulas" />
        </div>
        <div className="bottom_icons">
          <SideBarIcon icon={<ExitToAppIcon />} link="/login" desc="LogOut" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
