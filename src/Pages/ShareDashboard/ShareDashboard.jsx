import React, { useEffect, useState } from "react";
import styles from "./sharedashboard.module.css";
import Toggle from "../../components/Toggle/Toggle";
import { useAuth } from "../../components/Context/AuthContext";
import folderImage from "../../assets/folderImg.png";
import deleteImage from "../../assets/delete.png";
import FolderPopup from "../../components/FolderPopup/FolderPopup";
import FormPopup from "../../components/FormPopup/FormPopup";
import SharePopup from "../../components/SharePopup/SharePopup";
import { useNavigate, useParams } from "react-router-dom";
import {
  createFolder,
  createForm,
  getFolders,
  getForms,
} from "../../Services";
import toast from "react-hot-toast";
import FolderDeletePopup from "../../components/FolderDeletePopup/FolderDeletePopup";
import FormDelete from "../../components/FormDeletePopup/FormDelete";


const shareDashboard = () => {
  const { toggle } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [getAllFolder, setGetAllFolder] = useState([]);
  const [deleteFolderPopup, setDeleteFolderPopup] = useState(false);
  const [isFolderId, setIsFolderId] = useState(null);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsById, setFormsById] = useState([]);
  const name = localStorage.getItem("name");
  const { id } = useParams();
  const [deleteFormPopup, setDeleteFormPopup] = useState(false);
  const [isFormId, setIsFormId] = useState(null);
  const navigate = useNavigate();

  const getFolderData = async () => {
    try {
      const response = await getFolders(id);
      setGetAllFolder(response.folders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (name) => {
    try {
      const response = await createFolder(name, id);
      if (response.message === "Folder created successfully") {
        toast.success(response.message);
        getFolderData();
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsPopupOpen(false);
  };

  const handleFormSave = async (name) => {
    try {
      const response = await createForm(name, currentFolder, id);
      if (response.message === "Form created successfully") {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    getFolderData();
    setOpenPopup(false);
  };
  const handleShareSave = (name) => {
    console.log("Email:", name);
    setSharePopup(false);
  };

  const handleFolderDelete = async (folderId) => {
    setDeleteFolderPopup(true);
    setIsFolderId(folderId);
    getFolderData();
  };

  const handleFormDelete = (formId) => {
    setDeleteFormPopup(true);
    setIsFormId(formId);
  };

  useEffect(() => {
    getFolderData();
  }, [openPopup, isPopupOpen]);

  useEffect(() => {
    const getCreatedFormById = async () => {
      try {
        const response = await getForms(currentFolder, id);
        setFormsById(response.forms);
      } catch (error) {
        toast.error(error.message || "An error occurred");
      }
    };

    if (currentFolder) {
      getCreatedFormById();
    }
  }, [currentFolder, id, openPopup, isPopupOpen, deleteFolderPopup,deleteFormPopup]);
  useEffect(() => {
    const getCreatedForm = async () => {
      try {
        const response = await getForms(null, id);
        setForms(response.forms);
      } catch (error) {
        toast.error(error.message || "An error occurred");
      }
    };

    getCreatedForm();
  }, [openPopup, isPopupOpen, deleteFolderPopup,deleteFormPopup]);

  const navigateFolder = (folderId) => {
    setCurrentFolder(folderId);
  };
  return (
    <>
      <div className={`${styles.container} ${toggle ? "" : styles.light}`}>
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
            <p className={toggle ? "" : styles.light}>Light</p>
            <div>
              <Toggle />
            </div>
            <p className={toggle ? "" : styles.light}>Dark</p>
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
            <p
              className={toggle ? "" : styles.light}
              onClick={() => setIsPopupOpen(true)}
            >
              Create a folder
            </p>
          </div>
          {getAllFolder.length === 0
            ? ""
            : getAllFolder.map((folder) => (
                <div
                  key={folder._id}
                  className={`${styles.folders} ${
                    currentFolder === folder._id
                      ? toggle
                        ? styles.current
                        : styles.currentLight
                      : ""
                  } ${toggle ? "" : styles.light}`}
                >
                  <p
                    className={`${styles.folderText} ${
                      currentFolder === folder._id
                        ? toggle
                          ? styles.currentText
                          : styles.currentTextLight
                        : toggle
                        ? styles.defaultText
                        : styles.lightText
                    }`}
                    onClick={() => navigateFolder(folder._id)}
                  >
                    {folder.name}
                  </p>
                  <img
                    src={deleteImage}
                    onClick={() => handleFolderDelete(folder._id)}
                    alt="delete-image"
                  />
                </div>
              ))}
        </div>

        {currentFolder ? (
          <div className={styles.form}>
            <div className={styles.createForm}>
              <button onClick={() => setOpenPopup(true)}>+</button>
              <p>Create a typebot</p>
            </div>

            {formsById?.map((formById) => (
              <div
                key={formById._id}
                className={`${styles.newForm} ${toggle ? "" : styles.newLight}`}
              >
                <p className={`${toggle ? "" : styles.light}`}>
                  {formById.name}
                </p>
                <img
                  src={deleteImage}
                  onClick={() => handleFormDelete(formById._id)}
                  alt="delete-image"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.form}>
            <div className={styles.createForm}>
              <button onClick={() => setOpenPopup(true)}>+</button>
              <p>Create a typebot</p>
            </div>

            {forms?.map((form) => (
              <div
                key={form._id}
                className={`${styles.newForm} ${toggle ? "" : styles.newLight}`}
              >
                <p className={`${toggle ? "" : styles.light}`}>{form.name}</p>
                <img
                  src={deleteImage}
                  onClick={() => handleFormDelete(form._id)}
                  alt="delete-image"
                />
              </div>
            ))}
          </div>
        )}

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
        <FolderDeletePopup
          isOpen={deleteFolderPopup}
          onClose={() => setDeleteFolderPopup(false)}
          isFolderId={isFolderId}
          getFolderData={getFolderData}
        />
        <FormDelete
          isOpen={deleteFormPopup}
          onClose={() => setDeleteFormPopup(false)}
          isFormId={isFormId}
          id={id}
        />
      </div>
    </>
  );
};

export default shareDashboard;
