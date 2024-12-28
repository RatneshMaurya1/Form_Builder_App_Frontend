import React from 'react'
import styles from "./createform.module.css"
import Toggle from "../../components/Toggle/Toggle"
import { useAuth } from '../../components/Context/AuthContext'
import closeImage from "../../assets/close.png"
const CreateForm = () => {
    const {toggle} = useAuth()
  return (
    <>
    <div className={`${styles.createFormContainer} ${toggle ? "" : styles.light}`}>
      <nav className={toggle ? "" : styles.light}>
        <div className={styles.formNameInput}>
            <input className={toggle ? "" : styles.light} type="text" placeholder="Enter form name"/>
        </div>
        <div className={styles.flowAndResponse}>
            <div className={styles.flow}>
                <p>Flow</p>
            </div>
            <p className={toggle ? "" : styles.light}>Response</p>
        </div>
        <div className={styles.saveAndShare}>
            <div className={styles.lightAndDark}>
                <p className={toggle ? "" : styles.light}>Light</p>
                <div><Toggle/></div> 
                <p className={toggle ? "" : styles.light}>Dark</p>
            </div>
            <div className={styles.saveShareButton}>
                <button className={styles.shareButton}>Share</button>
                <button className={styles.saveButton}>Save</button>
                <img src={closeImage} alt="close-image" />
            </div>
        </div>
      </nav>

      <div className={styles.bubblesAndInput}>
        <div className={styles.bubbles}>
            <p>Bubbles</p>
            <div className={styles.bubblesInputs}>

            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CreateForm
