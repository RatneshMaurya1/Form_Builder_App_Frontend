import React, { useState } from "react";
import styles from "./setting.module.css";
import logoutImage from "../../assets/Logout.png";
import profileImage from "../../assets/Profile.png";
import lockImage from "../../assets/lock.png";
import hideTextImage from "../../assets/Group.png";
import toast from "react-hot-toast";
import { userUpdateData } from "../../Services";

const Setting = () => {
  const [isVisibleEmailText, setIsVisibleEmailText] = useState(false);
  const [isVisibleOldPasswordText, setIsVisibleOldPasswordText] =
    useState(false);
  const [isVisibleNewPasswordText, setIsVisibleNewPasswordText] =
    useState(false);
    const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleHideEmail = () => {
    setIsVisibleEmailText((prev) => !prev);
  };
  const handleHideOldPassword = () => {
    setIsVisibleOldPasswordText((prev) => !prev);
  };
  const handleHideNewPassword = () => {
    setIsVisibleNewPasswordText((prev) => !prev);
  };

  const handleSubmitForm = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await userUpdateData(formData);
      if (response.message === "Your data updated successfully.") {
        toast.success(response.message);
        setFormData({
            name:"",
            email:"",
            oldPassword:"",
            newPassword:""
        });
        localStorage.setItem("token",response.token)
        localStorage.setItem("userId",response.data.id)
        localStorage.setItem("name",response.data.name)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className={styles.Settingcontainer}>
      <p>Settings</p>
      <form className={styles.settingForm} onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <img
          className={styles.profile}
          src={profileImage}
          alt="profile-image"
        />
        <input
          type={isVisibleEmailText ? "password" : "text"}
          placeholder="Update Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <img className={styles.lockEmail} src={lockImage} alt="profile-image" />
        <img
          className={styles.hideTextEmail}
          onClick={handleHideEmail}
          src={hideTextImage}
          alt="profile-image"
        />
        <input
          type={isVisibleOldPasswordText ? "password" : "text"}
          placeholder="Old Password"
          value={formData.oldPassword}
          onChange={(e) =>
            setFormData({ ...formData, oldPassword: e.target.value })
          }
        />
        <img className={styles.lockOld} src={lockImage} alt="profile-image" />
        <img
          onClick={handleHideOldPassword}
          className={styles.hideTextOld}
          src={hideTextImage}
          alt="profile-image"
        />
        <input
          type={isVisibleNewPasswordText ? "password" : "text"}
          placeholder="New Password"
          value={formData.newPassword}
          onChange={(e) => setFormData({...formData,newPassword:e.target.value})}
        />
        <img className={styles.lockNew} src={lockImage} alt="profile-image" />
        <img
          onClick={handleHideNewPassword}
          className={styles.hideTextNew}
          src={hideTextImage}
          alt="profile-image"
        />
        <button disabled={loading} className={styles.submitBtn} type="submit">{loading ? "Loading..." : "Update"}</button>
      </form>
      <div className={styles.logout}>
        <img src={logoutImage} alt="logout-image" />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Setting;
