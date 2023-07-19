import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const SignUp = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.isLoggedIn) {
      navigate("/");
    }
  }, [context.isLoggedIn, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = React.useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    if (context.error) {
      reset();
    }
  }, [context.error]);

  const onSubmit = (data) => {
    const { name, email, password, passwordConfirm } = data;
    context.onSignup(name, email, password, passwordConfirm);
  };

  return (
    <div className={styles.signUp}>
      <h1>Create an Account</h1>
      {context.error && <p>{context.error.response.data.message}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <input
            type="text"
            placeholder="Enter Your Name Here"
            {...register("name", { required: true })}
          />
          {errors.name && <p>Name is required</p>}
        </div>
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
        <div className={styles.password}>
          <input
            type="password"
            placeholder="Confirm Your Password"
            {...register("passwordConfirm", {
              required: true,
              validate: (value) =>
                value === password.current || "Passwords do not match",
            })}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
        </div>
        <button type="submit" disabled={context.isLoading}>
          {context.isLoading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className={styles.login}>
        Already have an account? <Link to="/login">Log in here</Link>
      </div>
    </div>
  );
};

export default SignUp;
