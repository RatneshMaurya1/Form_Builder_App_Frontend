import React, { useState, useEffect } from "react";
import styles from "./toggle.module.css";
import { useAuth } from "../Context/AuthContext";

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const {setIsToggle} = useAuth()

  useEffect(() => {
    // document.body.className = isDarkMode ? styles.darkMode : styles.lightMode;
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    setIsToggle(isDarkMode)
  }, [isDarkMode]);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.toggleButton} ${
          isDarkMode ? styles.dark : styles.light
        }`}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        <div className={styles.knob}></div>
      </button>
    </div>
  );
};

export default Toggle;
