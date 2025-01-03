import React, { useState } from "react";
import styles from "./sharepopup.module.css";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import { addSharedWorkspaceByLink } from "../../Services";

const SharePopup = ({ isOpen, onClose, onSave }) => {
      const [folderName, setFolderName] = useState("");
      const [loading,setLoading] = useState(false)
      const [value,setValue] = useState("")
      const {toggle} = useAuth()
      const handleSelectEditViewValue = (e) => {
        setValue(e.target.value)
      }

      const handleShareDashboard = async() => {
        if(!value){
         return toast.error("Please Use 'edit' or 'view' mode.")
        }
        setLoading(true)
        try {
          const response = await addSharedWorkspaceByLink(value)
          if(response.message === "Shareable link created"){
            navigator.clipboard
            .writeText(response.shareableLink)
            .then(() => {
              toast.success("Link copied to clipboard!");
              setValue("")
            })
          }

        } catch (error) {
          toast.error(error.message)
        }finally{
          setLoading(false)
          onClose()
        }
      }
      const handleRemoveVal = () => {
        setValue("")
      }

      if (!isOpen) return null;
  return (
    <div className={styles.popupOverlay} onClick={() => {onClose();
      handleRemoveVal()
    }}>
      <div className={`${styles.popupContainer} ${toggle ? "" : styles.light}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.invite}>
        <h2 className={`${styles.popupTitle} ${toggle ? "" : styles.light}`}>Invite by Email</h2>
        <select className={`${toggle ? "" : styles.light}`} onChange={handleSelectEditViewValue}>
          <option value="">Select</option>
            <option className={`${toggle ? "" : styles.light}`} value="edit">Edit</option>
            <option className={`${toggle ? "" : styles.light}`} value="view">View</option>
        </select>
        </div>
        <input
          className={`${styles.popupInput} ${toggle ? "" : styles.light}`}
          type="text"
          placeholder="Enter email id"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <div className={styles.popupButtons}>
          <button
            className={styles.popupButton}
            onClick={() => {
              onSave(folderName,value);
              setFolderName("");
            }}
          >
            Send Invite
          </button>
        </div>
        <div className={styles.link}>
            <p className={toggle ? "" : styles.light}>Invite by link</p>
          <button 
            className={`${styles.popupButtonCancel} ${toggle ? "" : styles.light}`}
            onClick={handleShareDashboard}
            disabled={loading}
          >
            {loading ? "Loading..." : "Copy link"}
          </button>
          </div>
      </div>
    </div>
  )
}

export default SharePopup
