import React, { useState } from 'react'
import styles from "./signup.module.css"
import googleIcon from "../../assets/GoogleIcon.png"
import ellipse1 from "../../assets/Ellipse1.png"
import ellipse2 from "../../assets/Ellipse2.png"
import arrowImage from "../../assets/arrow_back.png"
import groupImage from "../../assets/Group2.png"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { userSignUp } from '../../Services'
import { useAuth } from '../../components/Context/AuthContext'

const SignUp = () => {
    const [loading,setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const navigate = useNavigate()
    const {logIn} = useAuth()


    
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return toast.error("Name is required");
    }
    if (!formData.email.trim()) {
      return toast.error("Email is required");
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      return toast.error("Email is invalid");
    }
    const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!formData.password.trim()) {
    return toast.error("Password is required");
  } else if (!regex.test(formData.password)) {
    return toast.error("Password must be at least 8 characters long and include uppercase, lowercase, numbers, and symbols");
  }
    if (!formData.confirmPassword.trim()) {
        return toast.error("Confirm password is required");
      }
      if(formData.password !== formData.confirmPassword){
        return toast.error("enter same password in both fields")
      }
    setLoading(true)
    try {
      const response = await userSignUp(formData);
      if (response.message === "Sign up successfully") {
        toast.success(response.message);
        setFormData({
            name:"",
            email:"",
            password:"",
            confirmPassword:""
        });
        localStorage.setItem("token",response.token)
        localStorage.setItem("userId",response.data.id)
        localStorage.setItem("name",response.data.name)
        logIn()
        navigate(`/dashboard/${localStorage.getItem("userId")}`)
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };
  return (
    <>
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <div className={styles.inputs}>
                <p>Username</p>
                <input type="text" placeholder='Enter a username' value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})}/>
            </div>
            <div className={styles.inputs}>
                <p>Email</p>
                <input type="text" placeholder='Enter your email' value={formData.email} onChange={(e) => setFormData({...formData, email:e.target.value})}/>
            </div>
            <div className={styles.inputs}>
                <p>Password</p>
                <input type="text" placeholder='Enter your password'  value={formData.password} onChange={(e) => setFormData({...formData, password:e.target.value})}/>
            </div>
            <div className={styles.inputs}>
                <p>Confirm Password</p>
                <input type="text" placeholder='Enter your confirm password'  value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword:e.target.value})}/>
            </div>
            <button type='submit' disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        </form>
        <h3>OR</h3>
        <button><div className={styles.googleImage}><img src={googleIcon} alt="google-image" /></div><span>Sign Up with Google</span></button>
        <h4>Already have an account ? <span onClick={() => navigate("/login")}>Login</span></h4>
        <img className={styles.ellipse1Img} src={ellipse1} alt="ellipse1-image" />
        <img className={styles.ellipse2Img} src={ellipse2} alt="ellipse2-image" />
        <img className={styles.arrow} onClick={() => navigate(-1)} src={arrowImage} alt="arrow-image" />
        <img className={styles.group} src={groupImage} alt="group-image" />
    </div>
    </>
  )
}

export default SignUp