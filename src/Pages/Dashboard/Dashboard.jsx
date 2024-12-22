import React, { useState } from "react";
import styles from "./dashboard.module.css";
import Toggle from "../../components/Toggle/Toggle";
import { useAuth } from "../../components/Context/AuthContext";
import folderImage from "../../assets/folderImg.png"
import deleteImage from "../../assets/delete.png"

const Dashboard = () => {
  const { toggle } = useAuth();

  return (
    <>
      <div className={styles.container}>
        <div className={`${styles.navBar} ${toggle ? "" : styles.navLight}`}>
          <div>
            <select
              id="options"
              className={`${styles.customSelect} ${
                toggle ? styles.dark : styles.light
              }`}
            >
              <option className={toggle ? "" : styles.optionLight} value="1">Dewank Rastogi's workspace</option>
              <option className={toggle ? "" : styles.optionLight} value="2">Option 2</option>
              <option className={toggle ? "" : styles.optionLight} value="3">Option 3</option>
            </select>
          </div>
          <div className={styles.theme}>
            <p>Light</p>
            <div>
              <Toggle />
            </div>
            <p>Dark</p>
          </div>
          <button>Share</button>
        </div>
        <div className={styles.allFolders}>
            <div className={`${styles.createFolder} ${toggle ? "" : styles.light}`}>
                <img className={toggle ? "" : styles.folderImgLight}  src={folderImage} alt="folder-image" />
                <p>Create a folder</p>
            </div>
            <div className={`${styles.folders} ${toggle ? "" : styles.light}`}>
                <p>Computer Networks</p>
                <img src={deleteImage} alt="delete-inage" />
            </div>
        </div>

        <div className={styles.form}>
        <div className={styles.createForm}>
            <button>+</button>
            <p>Create a typebot</p>
        </div>

        <div className={`${styles.newForm} ${toggle ? "" : styles.newLight}`}>
            <p className={`${toggle ? "" : styles.light}`}>New form</p>
            <img src={deleteImage} alt="delete-inage" />
        </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;