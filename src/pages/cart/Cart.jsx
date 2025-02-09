import "./cart.css";
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const calcTotal = () =>
    cart
      .reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      )
      .toFixed(1);

  return (
    <div>
      <Header />
      {cart.length > 0 ? (
        <div className="no-empty-cart">
          <div className="container">
            <div className="title">
              <span onClick={() => navigate("/products")}>All Products</span>
              <span> \ </span>
              <span>Cart</span>
            </div>
            <div className="items">
              {cart.map((item) => (
                <div className="single-item" key={item.id}>
                  <div className="info">
                    <div className="top-section">
                      <img src={item.image} alt="itemImage" />
                      <p className="pName">{item.name}</p>
                    </div>
                    <div className="bottom-section">
                      <p>Price: {item.price} ₪</p>
                      <p className="quantity">Quantity: {item.quantity}</p>
                      <p className="totalSalary">
                        Total:{" "}
                        {(Number(item.price) * Number(item.quantity)).toFixed(
                          1
                        )}{" "}
                        ₪
                      </p>
                    </div>
                  </div>
                  <DeleteSweepIcon
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  />
                </div>
              ))}
            </div>
            <div className="calculation">
              <div className="info">
                <h2>Total:</h2>
                <div className="checkout">
                  <h2>{calcTotal()} ₪</h2>
                  <span onClick={() => navigate("/cart/checkout")}>
                    Process to checkout
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="container">
            <p>Your cart is empty</p>
            <div className="btns">
              <button onClick={() => navigate("/products")}>
                Continue Shopping
              </button>
              <button onClick={() => navigate("/")}>Home Page</button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar Notification */}
      <Snackbar
        open={showNotification}
        autoHideDuration={3000}
        onClose={() => setShowNotification(false)}
      >
        <Alert
          onClose={() => setShowNotification(false)}
          severity="error"
          variant="filled"
        >
          The product has been successfully deleted from the cart!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;
