import React, { useState } from "react";
import styles from "./folderpopup.module.css";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";

const FolderPopup = ({ isOpen, onClose, onSave }) => {
  const [folderName, setFolderName] = useState("");
  const { toggle } = useAuth();

  const handleFolderData = () => {
    if (!folderName) {
      return toast.error("folderName is required");
    }
    if (folderName.length <= 2) {
      return toast.error("folderName is to short");
    }
    onSave(folderName);
    setFolderName("");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div
        className={`${styles.popupContainer} ${toggle ? "" : styles.light}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`${styles.popupTitle} ${toggle ? "" : styles.light}`}>
          Create New Folder
        </h2>
        <input
          className={`${styles.popupInput} ${toggle ? "" : styles.light}`}
          type="text"
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className={styles.popupButtons}>
          <button className={styles.popupButton} onClick={handleFolderData}>
            Done
          </button>
          <div className={styles.line}></div>
          <button
            className={`${styles.popupButtonCancel} ${
              toggle ? "" : styles.light
            }`}
            onClick={() => {
              setFolderName("");
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FolderPopup;
