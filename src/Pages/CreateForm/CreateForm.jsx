import React, { useEffect, useState } from "react";
import styles from "./createform.module.css";
import Toggle from "../../components/Toggle/Toggle";
import { useAuth } from "../../components/Context/AuthContext";
import closeImage from "../../assets/close.png";
import deleteImage from "../../assets/delete.png";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getFillFormLink, getWorkspaceForm } from "../../Services";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateForm = () => {
  const { toggle } = useAuth();
  const [additem, setAddItem] = useState([]);
  const [fillFormData,setFillFormData] = useState(null)
  const [formLinkLoading,setFormLinkLoading] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate()
  console.log(toggle)

  const handleAddItem = (item) => {
    if(fillFormData){
      return toast.error("The form has been created with fields. You can now share it.")
    }
    const itemId = Date.now();
    setAddItem([...additem, { itemId, item, content: "" }]);
  };
  const handleRemoveItem = (itemId) => {
    setAddItem((prev) => prev.filter((item) => item.itemId !== itemId));
  };
  const formNameFromStorage = localStorage.getItem("formName") || "";
  const formName = formNameFromStorage.length > 20 
    ? `${formNameFromStorage.slice(0, 20)}...` 
    : formNameFromStorage;  
  const formData = {
    formId: id,
    name: formNameFromStorage,
    elements: additem.map((item) => ({
      bubble:
        item.item === "bubbleText" || item.item === "bubbleImage"
          ? item.item
          : undefined,
      inputType: [
        "inputText",
        "inputNumber",
        "inputEmail",
        "inputPhone",
        "inputDate",
        "inputRating",
        "inputButton",
      ].includes(item.item)
        ? item.item
        : undefined,
      content: item.content,
      id: item.itemId.toString(),
    })),
  };

  const getCreatedForm = async() => {
    try {
      const response = await getWorkspaceForm(id)
      setFillFormData(response.form)
    } catch (error) {
      toast.error(error.message || "Error while hetting the form");
  }
}

  const handleSaveForm = async () => {
    if(fillFormData){
      return toast.error("The form has been created with fields. You can now share it.")
    }
    if (!formName.trim() || additem.length === 0) {
      toast.error("Form name and at least one element are required.");
      return;
    }
    if(!additem.find((e) => e.item === "inputButton")){
      return toast.error("A form should have a submit button.")
    }

    const hasEmptyContent = additem.some(
      (item) => 
        (item.item === "bubbleText" || 
         item.item === "bubbleImage" || 
         item.item === "inputText" || 
         item.item === "inputNumber") && 
        !item.content.trim()
    );
    
  
    if (hasEmptyContent) {
      toast.error("Bubbles and Input Text or input number are required fields.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/create/forms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Form saved successfully!");
        getCreatedForm()
        setAddItem([])
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Error saving form:", error);
    }
  };
  useEffect(() => {
  getCreatedForm()
  },[])

  const handleItemValue = (itemId, value) => {
    setAddItem((prevItems) =>
      prevItems.map((item) =>
        item.itemId === itemId ? { ...item, content: value } : item
      )
    );
  };

  const handleGenerateFillFormLink = async() =>{
    setFormLinkLoading(true)
    try {
      const response = await getFillFormLink(id)
      if(response.message === "Form link generated successfully!"){
        navigator.clipboard
        .writeText(response.formLink)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
      }
    } catch (error) {
      toast.error("Error saving form:", error);
    }finally{
      setFormLinkLoading(false)
    }
  }
  const userId = localStorage.getItem("userId")
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
              placeholder={formName}
              readOnly
            />
          </div>
          <div className={styles.flowAndResponse}>
            <div className={styles.flow}>
              <p>Flow</p>
            </div>
            <p onClick={() => navigate(`/response/${id}`)} className={toggle ? "" : styles.light}>Response</p>
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
              
              {fillFormData ? <button onClick={() => handleGenerateFillFormLink()} className={styles.shareButton1}>{formLinkLoading ? "Loading..." : "Share"}</button> : <button className={styles.shareButton2}>Share</button>}
              
              <button onClick={handleSaveForm} className={styles.saveButton}>
                Save
              </button>
              <img onClick={() => navigate(`/dashboard/${userId}`)} src={closeImage} alt="close-image" />
            </div>
          </div>
        </nav>

        <div className={styles.bubblesAndInputWrapper}>
          <div
            className={`${styles.bubblesAndInput} ${
              toggle ? "" : styles.light
            }`}
          >
            <p className={toggle ? "" : styles.light}>Bubbles</p>
            <div className={styles.bubbles}>
              <div
                onClick={() => handleAddItem("bubbleText")}
                className={`${styles.bubblesText} ${
                  toggle ? "" : styles.light
                }`}
              >
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390333/Vector_1_h4nxdq.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>Text</p>
              </div>
              <div
                onClick={() => handleAddItem("bubbleImage")}
                className={`${styles.bubblesText} ${
                  toggle ? "" : styles.light
                }`}
              >
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390332/SVG_mzm9a0.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>Image</p>
              </div>
              <div
                style={{ cursor: "auto" }}
                className={`${styles.bubblesText} ${
                  toggle ? "" : styles.light
                }`}
              >
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390332/SVG_1_y8mitp.png"
                  alt="text-image"
                />
                <p className={toggle ? "" : styles.light}>Video</p>
              </div>
              <div
                style={{ cursor: "auto" }}
                className={`${styles.bubblesText} ${
                  toggle ? "" : styles.light
                }`}
              >
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
                <div
                  onClick={() => handleAddItem("inputText")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390331/SVG_2_boz0wo.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Text</p>
                </div>
                <div
                  onClick={() => handleAddItem("inputNumber")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390329/SVG_3_rq2imb.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Number</p>
                </div>
                <div
                  onClick={() => handleAddItem("inputEmail")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/SVG_4_rkcokl.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Email</p>
                </div>
                <div
                  onClick={() => handleAddItem("inputPhone")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/Vector_2_raqz0t.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Phone</p>
                </div>
                <div
                  onClick={() => handleAddItem("inputDate")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/SVG_5_lg9fge.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Date</p>
                </div>
                <div
                  onClick={() => handleAddItem("inputRating")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390328/Vector_3_kttwzy.png"
                    alt="text-image"
                  />
                  <p className={toggle ? "" : styles.light}>Rating</p>
                </div>
                <div
                  onClick={() => handleAddItem("inputButton")}
                  className={`${styles.bubblesText} ${
                    toggle ? "" : styles.light
                  }`}
                >
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
              <div
                style={{ background: "none", border: "1px solid #D6D6D6" }}
                className={styles.start}
              >
                <img
                  src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735392837/Vector_5_s3x8r1.png"
                  alt="start-image"
                />
                <p style={{ color: "#000000" }}>Start</p>
              </div>
            )}
            {additem.map((allItem) => (
              <div key={allItem.itemId} className={styles.items}>
                {allItem.item === "bubbleText" && (
                  <div
                    className={`${styles.createdBubbleText} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Bubble Text</p>
                    <input
                      className={toggle ? "" : styles.light}
                      type="text"
                      required
                      placeholder="Click here to edit"
                      value={allItem.content}
                      onChange={(e) =>
                        handleItemValue(allItem.itemId, e.target.value)
                      }
                    />
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390333/Vector_1_h4nxdq.png"
                      alt="bubble-image"
                    />
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "bubbleImage" && (
                  <div
                    className={`${styles.createdBubbleText} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Bubble Image</p>
                    <input
                      className={toggle ? "" : styles.light}
                      type="text"
                      required
                      placeholder="Click here to edit"
                      value={allItem.content}
                      onChange={(e) =>
                        handleItemValue(allItem.itemId, e.target.value)}
                    />
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390332/SVG_mzm9a0.png"
                      alt="bubble-image"
                    />
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputText" && (
                  <div
                    className={`${styles.createdBubbleText} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Text</p>
                    <input
                      className={toggle ? "" : styles.light}
                      type="text"
                      required
                      placeholder="Click here to edit"
                      onChange={(e) =>
                        handleItemValue(allItem.itemId, e.target.value)}
                    />
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390331/SVG_2_boz0wo.png"
                      alt="bubble-image"
                    />
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputNumber" && (
                  <div
                    className={`${styles.createdBubbleText} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Number</p>
                    <input
                      className={toggle ? "" : styles.light}
                      type="text"
                      required
                      placeholder="Click here to edit"
                      onChange={(e) =>
                        handleItemValue(allItem.itemId, e.target.value)}
                    />
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735390329/SVG_3_rq2imb.png"
                      alt="bubble-image"
                    />
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputEmail" && (
                  <div
                    className={`${styles.createdInput} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Email</p>
                    <h3>Hint : User will input a email on his form</h3>
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputPhone" && (
                  <div
                    className={`${styles.createdInput} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Phone</p>
                    <h3>Hint : User will input a phone on his form</h3>
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputDate" && (
                  <div
                    className={`${styles.createdInput} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Date</p>
                    <h3>Hint : User will select a date</h3>
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputRating" && (
                  <div
                    className={`${styles.createdInput} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Rating</p>
                    <h3>Hint : User will tap to rate out of 5</h3>
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
                {allItem.item === "inputButton" && (
                  <div
                    className={`${styles.createdInput} ${
                      toggle ? "" : styles.light
                    }`}
                  >
                    <p className={toggle ? "" : styles.light}>Input Button</p>
                    <h3>
                      Hint : User will submit the form when he clicks the button
                    </h3>
                    <div
                      className={`${styles.deleteButton} ${
                        toggle ? "" : styles.light
                      }`}
                    >
                      <img
                        onClick={() => handleRemoveItem(allItem.itemId)}
                        src={deleteImage}
                        alt="delete-image"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateForm;
