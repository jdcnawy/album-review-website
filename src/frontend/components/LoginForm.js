import React from "react";
import styles from "./components.module.css";

const LoginForm = ({ loginUser }) => {
  return (
    <div className={styles.LoginForm}>
      <h2>Login</h2>
      <form onSubmit={(e) => loginUser(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;