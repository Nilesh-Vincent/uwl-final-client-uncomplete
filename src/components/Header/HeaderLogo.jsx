import styles from "./Header.module.css";
import Logo2 from "../UI/Logo/Logo2";
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <main className={styles["headerLogo"]}>
      <Link to="/">
        <Logo2 />
      </Link>
    </main>
  );
};

export default HeaderLogo;
