import React, { useState } from "react";
import styles from "./createform.module.css";
import Toggle from "../../components/Toggle/Toggle";
import { useAuth } from "../../components/Context/AuthContext";
import closeImage from "../../assets/close.png";
import deleteImage from "../../assets/delete.png"
const CreateForm = () => {
  const { toggle } = useAuth();
  const [additem,setAddItem] = useState([])

  const handleAddItem = (item) => {
    const itemId = Date.now()
    setAddItem([...additem,{itemId,item}])
  }
  const handleRemoveItem = (itemId) =>{
    setAddItem((prev) => prev.filter((item => item.itemId !== itemId)))
  } 
  console.log(additem)
  return (
    <>
      <div
        className={`${styles.createFormContainer} ${
          toggle ? "" : styles.light
        }`}
      >
        <nav className={toggle ? "" : styles.light}>
          <div className={styles.formNameInput}>
            <input
              className={toggle ? "" : styles.light}
              type="text"
              placeholder="Enter form name"
            />
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
              <div>
                <Toggle />
              </div>
              <p className={toggle ? "" : styles.light}>Dark</p>
            </div>
            <div className={styles.saveShareButton}>
              <button className={styles.shareButton}>Share</button>
              <button className={styles.saveButton}>Save</button>
              <img src={closeImage} alt="close-image" />
            </div>
          </div>
        </nav>

        <div className={styles.bubblesAndInputWrapper}>
          <div className={`${styles.bubblesAndInput} ${toggle ? "" : styles.light}`}>
            <p className={toggle ? "" : styles.light}>Bubbles</p>
            <div className={styles.bubbles}>
              <div onClick={() => handleAddItem("bubbleText")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390333/Vector_1_h4nxdq.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>Text</p>
              </div>
              <div onClick={() => handleAddItem("bubbleImage")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390332/SVG_mzm9a0.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>Image</p>
              </div>
              <div style={{cursor:"auto"}} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390332/SVG_1_y8mitp.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>Video</p>
              </div>
              <div style={{cursor:"auto"}} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390331/Container_1_acxmsl.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>GIF</p>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <p className={toggle ? "" : styles.light}>Inputs</p>
              <div className={styles.allInputs}>
                <div onClick={() => handleAddItem("inputText")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390331/SVG_2_boz0wo.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Text</p>
                </div>
                <div onClick={() => handleAddItem("inputNumber")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390329/SVG_3_rq2imb.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Number</p>
                </div>
                <div onClick={() => handleAddItem("inputEmail")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/SVG_4_rkcokl.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Email</p>
                </div>
                <div onClick={() => handleAddItem("inputPhone")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/Vector_2_raqz0t.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Phone</p>
                </div>
                <div onClick={() => handleAddItem("inputDate")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/SVG_5_lg9fge.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Date</p>
                </div>
                <div onClick={() => handleAddItem("inputRating")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/Vector_3_kttwzy.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Rating</p>
                </div>
                <div onClick={() => handleAddItem("inputButton")} className={`${styles.bubblesText} ${toggle ? "" : styles.light}`}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/SVG_6_hncmew.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Buttons</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.createForm}>
            {toggle ? (
              <div className={styles.start}>
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/Vector_4_lgm8zj.png"
                  alt="start-image"
                />
                <p>Start</p>
              </div>
            ) : (
              <div style={{background:"none",border: "1px solid #D6D6D6"}} className={styles.start}>
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735392837/Vector_5_s3x8r1.png"
                  alt="start-image"
                />
                <p style={{color:"#000000"}}>Start</p>
              </div>
            )}
            {additem.map((allItem) => (
              <div key={allItem.itemId} className={styles.items}>
                {allItem.item === "bubbleText" && 
                <div className={`${styles.createdBubbleText} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Bubble Text</p>
                  <input className={toggle ? "" : styles.light} type="text" required placeholder="Click here to edit"/>
                  <img src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390333/Vector_1_h4nxdq.png" alt="bubble-image" />
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "bubbleImage" && 
                <div className={`${styles.createdBubbleText} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Bubble Image</p>
                  <input className={toggle ? "" : styles.light} type="text" required placeholder="Click here to edit"/>
                  <img src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390332/SVG_mzm9a0.png" alt="bubble-image" />
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputText" && 
                <div className={`${styles.createdBubbleText} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Text</p>
                  <input className={toggle ? "" : styles.light} type="text" required placeholder="Click here to edit"/>
                  <img src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390331/SVG_2_boz0wo.png" alt="bubble-image" />
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputNumber" && 
                <div className={`${styles.createdBubbleText} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Number</p>
                  <input className={toggle ? "" : styles.light} type="text" required placeholder="Click here to edit"/>
                  <img src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390329/SVG_3_rq2imb.png" alt="bubble-image" />
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputEmail" && 
                <div className={`${styles.createdInput} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Email</p>
                  <h3>Hint : User will input a email on his form</h3>
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputPhone" && 
                <div className={`${styles.createdInput} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Phone</p>
                  <h3>Hint : User will input a phone on his form</h3>
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputDate" && 
                <div className={`${styles.createdInput} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Date</p>
                  <h3>Hint : User will select a date</h3>
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputRating" && 
                <div className={`${styles.createdInput} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Rating</p>
                  <h3>Hint : User will tap to rate out of 5</h3>
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
                {allItem.item === "inputButton" && 
                <div className={`${styles.createdInput} ${toggle ? "" : styles.light}`}>
                  <p className={toggle ? "" : styles.light}>Input Button</p>
                  <h3>Hint : User will submit the form when he clicks the button</h3>
                  <div className={`${styles.deleteButton} ${toggle ? "" : styles.light}`}>
                    <img onClick={() => handleRemoveItem(allItem.itemId)} src={deleteImage} alt="delete-image" />
                  </div>
                </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
