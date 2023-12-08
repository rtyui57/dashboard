import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import { getUser } from "../../pages/login/CookieManager";
import DomainIcon from "@mui/icons-material/Domain";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../../context/AuthContext";
import { func } from "prop-types";

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

export default function Sidebar() {
  const { logout } = useAuth();
  return (
    <div className="sidebar z-50">
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
            link="/notifications"
            desc="Notificaciones"
          />
          <SideBarIcon
            icon={<CalendarMonthIcon />}
            link="/calendario"
            desc="Calendario"
          />
          <SideBarIcon
            icon={<SchoolIcon />}
            link="/asignaturas"
            desc="Asignaturas"
          />
          <SideBarIcon icon={<DomainIcon />} link="/buildings" desc="Aulas" />
        </div>
        <div className="bottom_icons">
          <SideBarIcon icon={<ExitToAppIcon />} link="/login" desc="LogOut" />
        </div>
      </div>
    </div>
  );
}
