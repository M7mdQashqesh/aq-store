import "./sidebar.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddHomeIcon from "@mui/icons-material/AddHome";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="sidebar-component">
      <MenuIcon onClick={toggleSidebar} className="menu-icon" />
      <nav className={showSidebar ? "show" : ""} onClick={toggleSidebar}>
        <ul className={showSidebar ? "show" : ""}>
          <li>
            <StorefrontIcon />
            Add Product
          </li>
          <li>
            <ManageAccountsIcon />
            Manage Products
          </li>
          <li>
            <AddHomeIcon />
            Go To Home
          </li>
          <li>
            <LogoutIcon />
            Log Out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
