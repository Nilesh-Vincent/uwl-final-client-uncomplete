import React from "react";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles["logo"]}>
      <p className={styles["thrill"]}>Thrill </p>
      <p className={styles["quest"]}>Quest</p>
    </div>
  );
};

export default Logo;
