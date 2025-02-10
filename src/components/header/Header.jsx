import { useEffect, useState } from "react";
import "./header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartLength = cart.length;

  const navigate = useNavigate("");

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  useEffect(() => {
    // Prevent scrolling when the sidebar is open
    document.body.style.overflow = showSidebar ? "hidden" : "auto";
    return () => {
      // Cleanup to ensure scroll is enabled when the component unmounts
      document.body.style.overflow = "auto";
    };
  }, [showSidebar]);

  useEffect(() => {
    const userEmail = localStorage.getItem("user");
    if (userEmail) {
      setIsLoggingIn(true);
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <MenuOutlinedIcon
          className="menu-bars"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div className="logo">
          <img src="/logo.svg" alt="logo" onClick={() => navigateToPage("/")} />
        </div>
        <nav className={showSidebar ? "navbar show" : "navbar"}>
          <ul className={showSidebar ? "show" : ""}>
            <li onClick={() => setShowSidebar(!showSidebar)}>&times;</li>
            <li className={showSidebar ? "sidebar-img show" : "sidebar-img"}>
              <img src="/sidebar-logo.svg" alt="logo" />
            </li>
            <li>
              <a onClick={() => navigateToPage("/home")}>Home</a>
            </li>
            <li>
              <a onClick={() => navigateToPage("/products")}>All Products</a>
            </li>
            <li>
              <a onClick={() => navigateToPage("/contact-us")}>Contact Us</a>
            </li>
            {isLoggingIn && (
              <li>
                <a onClick={() => navigateToPage("/dashboard/addProduct")}>
                  Dashboard
                </a>
              </li>
            )}
            {!isLoggingIn && (
              <li>
                <a className="login" onClick={() => navigateToPage("/")}>Login</a>
              </li>
            )}
          </ul>
        </nav>
        <div className="cart-container" onClick={() => navigateToPage("/cart")}>
          <ShoppingCartOutlinedIcon className="cart" />
          <sup>({cartLength})</sup>
        </div>
      </div>
    </header>
  );
};

export default Header;
