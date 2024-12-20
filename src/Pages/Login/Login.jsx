import React from 'react'
import styles from "./login.module.css"
import googleIcon from "../../assets/GoogleIcon.png"
import ellipse1 from "../../assets/Ellipse1.png"
import ellipse2 from "../../assets/Ellipse2.png"
import arrowImage from "../../assets/arrow_back.png"
import groupImage from "../../assets/Group2.png"
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
  return (
    <>
   <div className={styles.container}>
         <form>
             <div className={styles.inputs}>
                 <p>Email</p>
                 <input type="text" placeholder='Enter your email'/>
             </div>
             <div className={styles.inputs}>
                 <p>Password</p>
                 <input type="text" placeholder='Enter your password'/>
             </div>
             <button type='submit'>Sign Up</button>
         </form>
         <h3>OR</h3>
         <button><div className={styles.googleImage}><img src={googleIcon} alt="google-image" /></div><span>Sign Up with Google</span></button>
         <h4>Don’t have an account? <span onClick={() => navigate("/signup")}>Register now</span></h4>
         <img className={styles.ellipse1Img} src={ellipse1} alt="ellipse1-image" />
         <img className={styles.ellipse2Img} src={ellipse2} alt="ellipse2-image" />
         <img className={styles.arrow} onClick={() => navigate(-1)} src={arrowImage} alt="arrow-image" />
         <img className={styles.group} src={groupImage} alt="group-image" />
     </div>
     </>
  )
}

export default Login
