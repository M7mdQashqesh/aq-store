import "./login.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/loginForm/LoginForm";

const Login = () => {
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

  return (
    <div className="login-page">
      <div className="image">
        <img src="/login.svg" alt="login" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
