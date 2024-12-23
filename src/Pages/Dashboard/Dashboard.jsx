import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Toggle from "../../components/Toggle/Toggle";
import { useAuth } from "../../components/Context/AuthContext";
import folderImage from "../../assets/folderImg.png";
import deleteImage from "../../assets/delete.png";
import FolderPopup from "../../components/FolderPopup/FolderPopup";
import FormPopup from "../../components/FormPopup/FormPopup";
import SharePopup from "../../components/SharePopup/SharePopup";
import { useParams } from "react-router-dom";
import { createFolder, deleteFolders, getFolders } from "../../Services";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { toggle } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [getAllFolder, setGetAllFolder] = useState([]);
  const name = localStorage.getItem("name");
  const { id } = useParams();

  const getFolderData = async () => {
    try {
      const response = await getFolders(id);
      setGetAllFolder(response.folders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async(name) => {
    try {
      const response = await createFolder(name,id)
      if(response.message === "Folder created successfully"){
        toast.success(response.message)
        getFolderData()
      }
    } catch (error) {
      toast.error(error.message)
    }
    setIsPopupOpen(false);
  };

  const handleFormSave = (name) => {
    console.log("Form Name:", name);
    setOpenPopup(false);
  };
  const handleShareSave = (name) => {
    console.log("Email:", name);
    setSharePopup(false);
  };

  const handleFolderDelete = async(folderId) => {
    try {
      const response = await deleteFolders(folderId)
      if(response.message === "Folders deleted successfully"){
        toast.success(response.message)
        getFolderData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  } 

  useEffect(() => {
    getFolderData();
  }, []);
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
              <option className={toggle ? "" : styles.optionLight} value="1">
                {name}'s workspace
              </option>
              <option className={toggle ? "" : styles.optionLight} value="2">
                Option 2
              </option>
              <option className={toggle ? "" : styles.optionLight} value="3">
                Option 3
              </option>
            </select>
          </div>
          <div className={styles.theme}>
            <p>Light</p>
            <div>
              <Toggle />
            </div>
            <p>Dark</p>
          </div>
          <button onClick={() => setSharePopup(true)}>Share</button>
        </div>
        <div className={styles.allFolders}>
          <div
            className={`${styles.createFolder} ${toggle ? "" : styles.light}`}
          >
            <img
              onClick={() => setIsPopupOpen(true)}
              className={toggle ? "" : styles.folderImgLight}
              src={folderImage}
              alt="folder-image"
            />
            <p onClick={() => setIsPopupOpen(true)}>Create a folder</p>
          </div>
          {getAllFolder.length === 0 ? (
            ""
          ) : (
            getAllFolder.map((folder) => (
              <div key={folder._id} className={`${styles.folders} ${toggle ? "" : styles.light}`}>
              <p>{folder.name}</p>
              <img src={deleteImage} onClick={() => handleFolderDelete(folder._id)} alt="delete-inage" />
            </div>
            ))
          )}
        </div>

        <div className={styles.form}>
          <div className={styles.createForm}>
            <button onClick={() => setOpenPopup(true)}>+</button>
            <p>Create a typebot</p>
          </div>

          <div className={`${styles.newForm} ${toggle ? "" : styles.newLight}`}>
            <p className={`${toggle ? "" : styles.light}`}>New form</p>
            <img src={deleteImage} alt="delete-inage" />
          </div>
        </div>
        <FolderPopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSave}
        />
        <FormPopup
          isOpen={openPopup}
          onClose={() => setOpenPopup(false)}
          onSave={handleFormSave}
        />
        <SharePopup
          isOpen={sharePopup}
          onClose={() => setSharePopup(false)}
          onSave={handleShareSave}
        />
      </div>
    </>
  );
};

export default Dashboard;
