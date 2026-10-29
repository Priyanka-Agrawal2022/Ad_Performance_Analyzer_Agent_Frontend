import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandMark}>◈</span>
        <span>Ad Analyzer</span>
      </Link>
      <nav className={styles.nav}>
        <Link to="/" className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}>
          Dashboard
        </Link>
        <Link to="/upload" className={`${styles.link} ${pathname === "/upload" ? styles.active : ""}`}>
          Upload
        </Link>
        <Link to="/analyze" className={`${styles.link} ${pathname === "/analyze" ? styles.active : ""}`}>
          Analyze
        </Link>
      </nav>
    </header>
  );
}
