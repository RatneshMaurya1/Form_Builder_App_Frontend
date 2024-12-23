import React, { useState } from "react";
import styles from "./formpopup.module.css";
import { useAuth } from "../Context/AuthContext";

const FormPopup = ({ isOpen, onClose, onSave }) => {
  const [folderName, setFolderName] = useState("");
  const {toggle} = useAuth()

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={`${styles.popupContainer} ${toggle ? "" : styles.light}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={`${styles.popupTitle} ${toggle ? "" : styles.light}`}>Create New Form</h2>
        <input
          className={`${styles.popupInput} ${toggle ? "" : styles.light}` }
          type="text"
          placeholder="Enter form name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className={styles.popupButtons}>
          <button
            className={styles.popupButton}
            onClick={() => {
              onSave(folderName);
              setFolderName("");
            }}
          >
            Done
          </button>
          <div className={styles.line}></div>
          <button
            className={`${styles.popupButtonCancel} ${toggle ? "" : styles.light}`}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormPopup;
