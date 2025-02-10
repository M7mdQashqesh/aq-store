import LoginForm from "../../components/loginForm/LoginForm";
import "./login.css";

const Login = () => {
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
