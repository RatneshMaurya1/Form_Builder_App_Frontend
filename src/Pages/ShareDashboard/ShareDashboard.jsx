import React, { useEffect, useState, useCallback } from "react";
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
  createWorkspace,
  createWorkspaceForm,
  deleteFolders,
  deleteForm,
  deleteItemsFromWorkspace,
  getFolders,
  getForms,
  getSharedWorkspace,
  shareWorkspace,
} from "../../Services";
import toast from "react-hot-toast";
import FolderDeletePopup from "../../components/FolderDeletePopup/FolderDeletePopup";
import FormDelete from "../../components/FormDeletePopup/FormDelete";

const Dashboard = () => {
  const { toggle } = useAuth();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [sharePopup, setSharePopup] = useState(false);
  const [getAllFolder, setGetAllFolder] = useState([]);
  const [deleteFolderPopup, setDeleteFolderPopup] = useState(false);
  const [currentFolder, setCurrentFolder] = useState(null);
  const [forms, setForms] = useState([]);
  const [formsById, setFormsById] = useState([]);
  const [deleteFormPopup, setDeleteFormPopup] = useState(false);
  const [isFolderId, setIsFolderId] = useState(null);
  const [isFormId, setIsFormId] = useState(null);
  const [isDeletingForm, setIsDeletingForm] = useState(false);
  const [workspace,setWorkspace] = useState([])
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchFolders = useCallback(async () => {
    try {
      const response = await getFolders(id);
      setGetAllFolder(response.folders);
    } catch (error) {
      toast.error(error.message || "Error fetching folders");
    }
  }, [id]);

  const fetchFormsByFolder = useCallback(async () => {
    if (currentFolder && !isDeletingForm) {
      try {
        const response = await getForms(currentFolder, id);
        setFormsById(response.forms);
        const formIds = response?.forms?.map((form) => form._id);
        await createWorkspaceForm(id, formIds);
      } catch (error) {
        toast.error(error.message || "Error fetching forms");
      }
    }
  }, [currentFolder, id, isDeletingForm]);

  const fetchAllForms = useCallback(async () => {
    try {
      const response = await getForms(null, id);
      setForms(response.forms);
      if (!isDeletingForm) {
        const formIds = response?.forms?.map((form) => form._id);
        await createWorkspaceForm(id, formIds);
      }
    } catch (error) {
      toast.error(error.message || "Error fetching forms");
    }
  }, [id, isDeletingForm]);
  const handleSave = async (name) => {
    try {
      const response = await createFolder(name, id);
      if (response.message === "Folder created successfully") {
        toast.success(response.message);
        await fetchFolders();
      }
    } catch (error) {
      toast.error(error.message || "Error creating folder");
    } finally {
      setIsPopupOpen(false);
    }
  };
  const handleFormSave = async (name) => {
    try {
      const response = await createForm(name, currentFolder, id);
      if (response.message === "Form created successfully") {
        toast.success(response.message);
        await fetchFormsByFolder();
        await fetchAllForms();
      }
    } catch (error) {
      toast.error(error.message || "Error creating form");
    } finally {
      setOpenPopup(false);
    }
  };

  const onSavehandleFolderDelete = async () => {
    try {
      const response = await deleteFolders(isFolderId);
      if (response.message === "Folders deleted successfully") {
        toast.success(response.message);
        await fetchFolders();
        await deleteItemsFromWorkspace(id, isFolderId);

        if (currentFolder === isFolderId) {
          setCurrentFolder(null);
        }
      }
    } catch (error) {
      toast.error(error.message || "Error deleting folder");
    } finally {
      setDeleteFolderPopup(false);
    }
  };
  const handleFolderDelete = async (folderId) => {
    setDeleteFolderPopup(true);
    setIsFolderId(folderId);
  };
  const handleFormDelete = async (formId) => {
    setDeleteFormPopup(true);
    setIsFormId(formId);
  };
  const onSavehandleFormDelete = async () => {
    try {
      setIsDeletingForm(true);
      const response = await deleteForm(id, isFormId);
      if (response.message === "Form deleted successfully") {
        toast.success(response.message);
        await fetchFormsByFolder();
        await fetchAllForms();
        await deleteItemsFromWorkspace(id, isFormId);
      }
    } catch (error) {
      toast.error(error.message || "Error deleting form");
    } finally {
      setDeleteFormPopup(false);
      setIsDeletingForm(false);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchAllForms();
  }, [fetchFolders, fetchAllForms]);

  useEffect(() => {
    fetchFormsByFolder();
  }, [fetchFormsByFolder]);

  const navigateFolder = (folderId) => {
    setCurrentFolder((prev) => (prev === folderId ? null : folderId));
  };


  const handleShareSave = async(email,value) => {
    try {
      const response = await shareWorkspace(id,email,value);
      if (response.success === true) {
    toast.success("dashboard added successfully")
      }
    } catch (error) {
      toast.error(error.message || "Error creating form");
    } finally {
      setSharePopup(false);
    }
  };
  useEffect(() => {
    const folderForWorkspace = async() => {
      try {
        const response = await getFolders(id);
        const folderIds = response?.folders?.map((folder) => folder._id);
        await createWorkspace(id, folderIds);
      }catch (error) {
        toast.error(error.message || "Error creating form");
      }
    }
 folderForWorkspace()
  },[])

  useEffect(() => {
    const SharedWorkspaces = async() => {
      try {
      const response = await getSharedWorkspace(id)
      if(response.message === "Workspaces fetched successfully."){
        setWorkspace(response.workspaces)
      }
      }catch (error) {
        toast.error(error.message || "Error creating form");
      }
    }
 SharedWorkspaces()
  },[])

  
  const handleSelectValue = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "Setting") {
    }
    if (workspace?.some((work) => work.name === selectedValue)) {
    }
  };

  const name = localStorage.getItem("name");
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
              onChange={handleSelectValue}
            >
              <option className={toggle ? "" : styles.optionLight} value={name}>
                {name}'s workspace
              </option>
              {workspace?.length > 0 && workspace.map((userWorkspace) => (
                <option key={userWorkspace._id} value={userWorkspace.name}>{userWorkspace.name}'s workspace</option>
              ))}
              <option
                onClick={() => console.log("setting clicked")}
                className={toggle ? "" : styles.optionLight}
                value="Setting"
              >
                Settings
              </option>
              <option
                className={toggle ? "" : styles.optionLight}
                value="Log Out"
              >
                Log Out
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
              onClick={() => {
                setIsPopupOpen(true);
              }}
            >
              Create a folder
            </p>
          </div>
          {getAllFolder?.length === 0
            ? ""
            : getAllFolder?.map((folder) => (
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
          getFolderData={fetchFolders}
          onSave={onSavehandleFolderDelete}
        />
        <FormDelete
          isOpen={deleteFormPopup}
          onClose={() => setDeleteFormPopup(false)}
          isFormId={isFormId}
          id={id}
          onSave={onSavehandleFormDelete}
        />
      </div>
    </>
  );
};

export default Dashboard;
