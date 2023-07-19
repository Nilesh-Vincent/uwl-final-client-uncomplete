import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./LogIn.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.isLoggedIn) {
      navigate("/");
    }
  }, [context.isLoggedIn, navigate]);

  useEffect(() => {
    if (context.error) {
      reset();
    }
  }, [context.error]);

  const onSubmit = (data) => {
    context.onLogin(data.email, data.password);
  };

  return (
    <div className={styles.logIn}>
      <h1>Customer LogIn</h1>
      {context.error && <p>{context.error.response.data.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email}>
          <input
            type="email"
            placeholder="Enter Your Email Here"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <p>Email is required</p>}
        </div>
        <div className={styles.password}>
          <input
            type="password"
            placeholder="Enter Your Password Here"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p>Password is required and must be at least 6 characters</p>
          )}
        </div>
        <button type="submit" disabled={context.isLoading}>
          {context.isLoading ? "Loading..." : "Log In"}
        </button>
      </form>
      <div className={styles.forgotPassword}>Forgot your password?</div>
      <div className={styles.signUp}>
        Don't have an account yet? <Link to="/signup">Sign up here</Link>
      </div>
    </div>
  );
};

export default Login;
