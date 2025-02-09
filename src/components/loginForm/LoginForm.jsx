import { useState } from "react";
import "./loginForm.css";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const navigate = useNavigate();

  const navigatePage = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleLoginAsAdmin = async (e) => {
    e.preventDefault();

    const storedEmail = import.meta.env.VITE_EMAIL;

    const storedHashedPassword = import.meta.env.VITE_PASSWORD;

    if (!storedEmail || !storedHashedPassword) {
      alert("Error: Admin credentials are not set!");
      return;
    }

    if (email !== storedEmail) {
      alert("Check your email or password to log in.");
      return;
    }

    const match = await bcrypt.compare(password, storedHashedPassword);

    if (match) {
      localStorage.setItem("user", JSON.stringify({ email }));
      alert("Login Successful!");
      navigatePage("/home");
    } else {
      alert("Check your email or password to log in.");
    }
  };

  const handleClicked = (e) => {
    if (clicked === true) {
      handleLoginAsAdmin(e);
      console.log("login");
    } else {
      setClicked(true);
      setShowInputs(true);
      console.log("show");
    }
  };

  const handleLoginAsClient = (e) => {
    e.preventDefault();
    navigatePage("/home");
  };

  return (
    <div className="login-form-component">
      <h1>Welcome!</h1>
      <form>
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

        <input
          type="submit"
          value="Login as client"
          onClick={handleLoginAsClient}
        />
        <input type="submit" value="Login as admin" onClick={handleClicked} />
      </form>
    </div>
  );
};

export default LoginForm;
