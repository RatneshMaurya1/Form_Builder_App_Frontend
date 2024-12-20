import React from 'react'
import styles from "./landing.module.css"
import titleImage from "../../assets/TitleSvg.png"
const Landing = () => {
  return (
    <>
    <div className={styles.container}>
        <div className={styles.navBar}> 
            <div className={styles.title}>
                <img src={titleImage} alt="Title-image" />
                <p></p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Landing