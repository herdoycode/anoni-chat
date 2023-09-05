import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../../services/apiClient";
import "./Login.scss";

interface FormData {
  email: string;
  password: string;
}

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(8).required().label("Password"),
});

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const onSubmit = (data: FormData) => {
    setLoading(true);
    apiClient
      .post("/auth", data)
      .then((res) => {
        localStorage.setItem("token", res.data);
        setLoading(false);
        toast.success("Login Success!");
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) return navigate("/");
  }, [token]);

  return (
    <div className="login">
      <div className="box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-item">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <p className="danger">{errors.email.message}</p>}
          </div>
          <div className="input-item">
            <input
              {...register("password")}
              type="password"
              placeholder="Password...."
            />
            {errors.password && (
              <p className="danger">{errors.password.message}</p>
            )}
          </div>
          <button> {isLoading ? "Loading..." : "Login"} </button>
        </form>
        <p>
          Don't have any accout? <Link to="/register">Register now.</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
