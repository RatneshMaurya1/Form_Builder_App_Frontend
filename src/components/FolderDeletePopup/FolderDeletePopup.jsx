import React, { useState } from "react";
import styles from "./folderdeletepopup.module.css";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { deleteFolders } from "../../Services";

const FolderPopup = ({ isOpen, onClose, isFolderId, getFolderData }) => {
  const {toggle} = useAuth()

  const handleDelete = async() => {
        try {
          const response = await deleteFolders(isFolderId);
          if (response.message === "Folders deleted successfully") {
            toast.success(response.message);
            getFolderData()
            onClose()
          }
        } catch (error) {
          toast.error(error.message);
        }
  }
  if (!isOpen) return null;
  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={`${styles.popupContainer} ${toggle ? "" : styles.light}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={`${styles.popupTitle} ${toggle ? "" : styles.light}`}>Are you sure you want to 
        delete this folder ?</h2>
        <div className={styles.popupButtons}>
          <button
            className={styles.popupButton}
            onClick={() => handleDelete()}
          > 
            Confirm
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

export default FolderPopup;
