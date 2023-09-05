import { joiResolver } from "@hookform/resolvers/joi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { storage } from "../../firebase";
import apiClient from "../../services/apiClient";
import "./Register.scss";

interface FormData {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
}

const schema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(8).required().label("Password"),
  avatar: Joi.any().required(),
});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const file = data.avatar[0];
    const storageRef = ref(storage, `${Date.now()}`);
    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL: string) => {
        apiClient
          .post("/users", { ...data, avatar: downloadURL })
          .then((res) => {
            localStorage.setItem("token", res.headers["x-auth-token"]);
            setLoading(false);
            toast.success("Registered Success!");
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          })
          .catch((err) => {
            setLoading(false);
            toast.error(err.message);
          });
      });
    });
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) return navigate("/");
  }, [token]);

  return (
    <div className="register">
      <div className="box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-item">
            <input
              {...register("name")}
              type="text"
              placeholder="Full Name..."
            />
            {errors.name && <p className="danger"> {errors.name.message} </p>}
          </div>
          <div className="input-item">
            <input
              {...register("email")}
              type="email"
              placeholder="Email Address"
            />
            {errors.email && <p className="danger"> {errors.email.message} </p>}
          </div>
          <div className="input-item">
            <input
              {...register("password")}
              type="password"
              placeholder="Password...."
            />
            {errors.password && (
              <p className="danger"> {errors.password.message} </p>
            )}
          </div>
          <div className="input-item">
            <input
              {...register("avatar")}
              type="file"
              required
              placeholder="Password...."
            />
            {errors.avatar && (
              <p className="danger"> {errors.avatar.message} </p>
            )}
          </div>
          <button disabled={isLoading && isValid}>
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
        <p>
          Already have accoutn? <Link to="/login">Login.</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
