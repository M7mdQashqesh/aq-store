import { useEffect, useState } from "react";
import "./loginForm.css";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

  const navigatePage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      navigatePage("/home");
    }
  });

  const handleLoginAsAdmin = async (e) => {
    e.preventDefault();

    const storedEmail = import.meta.env.VITE_EMAIL;

    const storedHashedPassword = import.meta.env.VITE_PASSWORD;

    if (email !== storedEmail) {
      setSnackbar({
        open: true,
        message: "Check your email or password to log in.",
        severity: "error",
      });

      return;
    }

    const match = await bcrypt.compare(password, storedHashedPassword);

    if (match) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigatePage("/home");
    } else {
      setSnackbar({
        open: true,
        message: "Check your email or password to log in.",
        severity: "error",
      });
    }
  };

  const handleClicked = (e) => {
    if (clicked === true) {
      handleLoginAsAdmin(e);
    } else {
      setClicked(true);
      setShowInputs(true);
    }
  };

  const handleLoginAsClient = (e) => {
    e.preventDefault();
    navigatePage("/home");
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="login-form-component">
      <h1>Welcome!</h1>
      <form>
        {showInputs && (
          <div className={`inputs ${showInputs ? "admin" : ""}`}>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        )}

        <input
          type="submit"
          value="Login as client"
          onClick={handleLoginAsClient}
        />
        <input type="submit" value="Login as admin" onClick={handleClicked} />
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginForm;
