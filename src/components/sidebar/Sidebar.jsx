import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link } from "react-router-dom";
import DomainIcon from "@mui/icons-material/Domain";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SchoolIcon from "@mui/icons-material/School";
import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../context/NotificationsContext";
import React from "react";

const SideBarIcon = ({
  icon,
  link,
  desc = "Hola",
  messages = [],
}) => {
  return (
    <div className="cover group">
      {messages.length !== 0 && <div className="notification rounded-full"></div>}
      <span className="scale-0 group-hover:scale-100 sidebar-tooltip">
        {messages.length + " " + desc}
      </span>
      <Link to={link} style={{ textDecoration: "none" }}>
        {icon}
      </Link>
    </div>
  );
};

export default function Sidebar() {
  const { role } = useAuth();
  const { getMessages } = useNotifications();

  return (
    <div className="sidebar z-50">
      <div className="icons_container">
        <div className="top_icons">
          <SideBarIcon icon={<DashboardIcon />} link="/" desc="Home" />
          {role === "ADMIN" && (
            <SideBarIcon
              icon={<PersonOutlineIcon />}
              link="/users"
              desc="Users"
            />
          )}
          <SideBarIcon
            icon={<NotificationsActiveIcon />}
            link="/notifications"
            desc="Notificaciones"
            messages={getMessages()}
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
          {role === "ADMIN" && (
            <SideBarIcon icon={<DomainIcon />} link="/buildings" desc="Aulas" />
          )}
        </div>
        <div className="bottom_icons">
          <SideBarIcon icon={<ExitToAppIcon />} link="/login" desc="LogOut" />
        </div>
      </div>
    </div>
  );
}
