import "./sidebar.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AddHomeIcon from "@mui/icons-material/AddHome";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleHiddenSidebar = () => {
    setShowSidebar(false);
  };

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigateToPage("/");
  };

  // prevent scrolling when sidebar is open
  useEffect(() => {
    document.body.style.overflow = showSidebar ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  return (
    <div className="sidebar-component">
      <MenuIcon onClick={handleShowSidebar} className="menu-icon" />
      <nav className={showSidebar ? "show" : ""} onClick={handleHiddenSidebar}>
        <ul className={showSidebar ? "show" : ""}>
          <li onClick={() => navigateToPage("/dashboard/addProduct")}>
            <StorefrontIcon />
            Add Product
          </li>
          <li onClick={() => navigateToPage("/dashboard/manageProducts")}>
            <ManageAccountsIcon />
            Manage Products
          </li>
          <li onClick={() => navigateToPage("/home")}>
            <AddHomeIcon />
            Go To Home
          </li>
          <li onClick={handleLogout}>
            <LogoutIcon />
            Log Out
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
