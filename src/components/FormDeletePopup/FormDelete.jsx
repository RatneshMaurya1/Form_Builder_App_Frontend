import React, { useState } from "react";
import styles from "./formdelete.module.css";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { deleteFolders, deleteForm } from "../../Services";

const FolderPopup = ({ isOpen, onClose, isFormId,id,onSave}) => {
  const {toggle} = useAuth()

  const handleDeleteForm = async() => {
        try {
          const response = await deleteForm(id,isFormId);
          if (response.message === "Form deleted successfully") {
            toast.success(response.message);
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
        delete this Form ?</h2>
        <div className={styles.popupButtons}>
          <button
            className={styles.popupButton}
            onClick={() => onSave()}
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
