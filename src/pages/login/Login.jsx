import LoginForm from "../../components/loginForm/LoginForm";
import "./login.css";

const Login = () => {
  const storedEmail = import.meta.env.VITE_EMAIL;
  const storedPass = import.meta.env.VITE_PASSWORD;

  console.log(storedEmail);
  console.log(storedPass);

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
