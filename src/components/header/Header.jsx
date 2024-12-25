import { useEffect, useState } from "react";
import "./header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const navigate = useNavigate("");

  useEffect(() => {
    // Prevent scrolling when the sidebar is open
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
    return () => {
      // Cleanup to ensure scroll is enabled when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  return (
    <header className="header">
      <div className="container">
        <MenuOutlinedIcon
          className="menu-bars"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div className="logo">
          <img src="/logo.svg" alt="logo" onClick={() => navigate("/")} />
        </div>
        <nav className={showSidebar ? "navbar show" : "navbar"}>
          <ul className={showSidebar ? "show" : ""}>
            <li onClick={() => setShowSidebar(!showSidebar)}>&times;</li>
            <li className={showSidebar ? "sidebar-img show" : "sidebar-img"}>
              <img src="/sidebar-logo.svg" alt="logo" />
            </li>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/products">All Products</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/contact-us">Contact</a>
            </li>
          </ul>
        </nav>
        <ShoppingCartOutlinedIcon className="cart" />
      </div>
    </header>
  );
};

export default Header;
