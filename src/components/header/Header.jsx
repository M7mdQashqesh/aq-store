import { useState } from "react";
import "./header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate("");

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
        <ShoppingCartOutlinedIcon
          onClick={() => {
            setShowCart(!showCart);
          }}
          className="cart"
        />
        <div
          className={showCart ? "back-of-checkout show" : "back-of-checkout"}
        >
          <div className={showCart ? "checkout show" : "checkout"}>
            <p className="close-cart" onClick={() => setShowCart(!showCart)}>
              &times;
            </p>
            <a href="/cart">Shopping cart</a>
            <p>Your cart is empty</p>
            <div>
              <div>
                <span>Total: </span>
                <span>0 ₪</span>
              </div>
              <p>Remove all items</p>
            </div>
            <a href="/cart/checkout">Checkout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
