import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import Header from "../../components/header/Header";
import "./checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [formData, setFormData] = useState({
    phoneNumber: "",
    city: "Hebron",
    firstName: "",
    lastName: "",
    address: "",
    clinicName: "",
  });
  const navigate = useNavigate("");

  const navigateToPage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };
  
  // EmailJS configuration
  const EMAIL_SERVICE_ID = "service_u14hvbc";
  const EMAIL_TEMPLATE_ID = "template_1kwmbxt";
  const EMAIL_PUBLIC_KEY = "MxQsENPr4Ra-GPZvF";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const cities = [
    "Hebron",
    "Jerusalem",
    "Ramallah",
    "Nablus",
    "Bethlehem",
    "Jenin",
    "Tulkarm",
    "Qalqilya",
    "Tubas",
    "Salfit",
    "Gaza",
    "Khan Yunis",
    "Rafah",
    "Deir al-Balah",
    "Jabalia",
    "Beit Hanoun",
  ];

  const calcTotal = () => {
    return cart
      .reduce((total, item) => {
        return total + Number(item.pPrice) * Number(item.pQuantity);
      }, 0)
      .toFixed(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatOrderDetailsForEmail = () => {
    return cart
      .map(
        (item) => `
      Product: ${item.pName}
      Quantity: ${item.pQuantity}
      Total Price: ${(item.pQuantity * item.pPrice).toFixed(1)} ₪
    `
      )
      .join("\n");
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.phoneNumber ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.clinicName
    ) {
      setNotification({
        open: true,
        message: "Please fill in all required fields",
        severity: "error",
      });
      return;
    }

    setLoading(true);

    const templateParams = {
      to_email: "aqqashqesh@gmail.com",
      customer_name: `${formData.firstName} ${formData.lastName}`,
      phone_number: formData.phoneNumber,
      city: formData.city,
      address: formData.address,
      clinic_name: formData.clinicName,
      order_details: formatOrderDetailsForEmail(),
      total: calcTotal(),
    };

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        templateParams,
        EMAIL_PUBLIC_KEY
      );

      setNotification({
        open: true,
        message: "Order sent successfully!",
        severity: "success",
      });

      localStorage.removeItem("cart");
      setCart([]);
      clearFields();

      // Navigate to home page after a short delay
      setTimeout(() => {
        navigateToPage("/");
      }, 2000);
    } catch (error) {
      console.error("Error sending order:", error);
      setNotification({
        open: true,
        message: "Error sending order. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setFormData({
      phoneNumber: "",
      city: "Hebron",
      firstName: "",
      lastName: "",
      address: "",
      clinicName: "",
    });
  };

  return (
    <div className="checkout-page">
      <Header />
      <div className="container">
        <form onSubmit={handleSubmit} className="user-details">
          <div className="contact">
            <h2>Contact</h2>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone number"
              required
            />
          </div>
          <div className="delivery">
            <h2>Delivery</h2>
            <div className="city">
              <label htmlFor="cities">City</label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                id="cities"
              >
                {cities.map((city, index) => (
                  <option key={index + city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="user-name">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                required
              />
            </div>
            <div className="address">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              />
              <input
                type="text"
                name="clinicName"
                value={formData.clinicName}
                onChange={handleInputChange}
                placeholder="Clinic name"
                required
              />
            </div>
          </div>
          <div className="btns">
            <button
              type="button"
              disabled={loading}
              className="back-btn"
              onClick={() => navigateToPage("/cart")}
            >
              Back
            </button>
            <button type="submit" disabled={loading} className="confirm-btn">
              {loading ? "Sending..." : "Confirm"}
            </button>
          </div>
        </form>
        <div className="summary">
          <h2>Order Summary</h2>
          <div className="orders">
            {cart.map((product,index) => (
              <div key={product.id+index} className="order">
                <span>x{product.pQuantity}</span>
                <span>{product.pName}</span>
                <span>{(product.pQuantity * product.pPrice).toFixed(1)} ₪</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="pricing">
            <div className="sub-total">
              <span>Subtotal</span>
              <span>{calcTotal()} ₪</span>
            </div>
            <div className="shipping">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>{calcTotal()} ₪</span>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;
