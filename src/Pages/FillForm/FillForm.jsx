import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getFillForm } from "../../Services";
import styles from "./FillForm.module.css";

const FillForm = () => {
  const { id } = useParams();
  const [formElements, setFormElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await getFillForm(id);
        setFormElements(response.getFillForm.elements || []);
      } catch (error) {
        toast.error("Error fetching form");
      }
    };

    fetchForm();
  }, [id]);

  useEffect(() => {
    if (currentIndex < formElements.length -1) {
      const timer = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [currentIndex, formElements]);

  const handleInputChange = (e, id) => {
    setInputValues({ ...inputValues, [id]: e.target.value });
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 1000);
  };

  return (
    <div className={styles.formContainer}>
      {formElements.slice(0, currentIndex + 1).map((element) => (
        <div key={element.id} className={styles.formElement}>
          {element.bubble && (
            <div className={styles.bubble}>
              {element.bubble === "bubbleText" && (
                <div className={styles.bubbleText}>
                  <img
                    src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735556185/image_4_ezfuvk.png"
                    alt="bubble-image"
                  />
                  <div className={styles.bubbleTextContent}>
                    <p>{element.content}</p>
                  </div>
                </div>
              )}
              {element.bubble === "bubbleImage" && (
                <div className={styles.bubbleImage}>
                  <img src={element.content} alt="Bubble Content" />
                </div>
              )}
            </div>
          )}

          {element.inputType && (
            <div className={styles.inputContainer}>
              {element.inputType === "inputText" && (
                <div className={styles.inputText}>
                  <input
                    type="text"
                    placeholder={element.content}
                    value={inputValues[element.id] || ""}
                    onChange={(e) => handleInputChange(e, element.id)}
                  />
                  <button onClick={handleButtonClick}>
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                      alt="submit-image"
                    />
                  </button>
                </div>
              )}
              {element.inputType === "inputNumber" && (
                <div className={styles.inputText}>
                  <input
                    type="number"
                    placeholder={element.content}
                    value={inputValues[element.id] || ""}
                    onChange={(e) => handleInputChange(e, element.id)}
                  />
                  <button onClick={handleButtonClick}>
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                      alt="submit-image"
                    />
                  </button>
                </div>
              )}
              {element.inputType === "inputEmail" && (
                <div className={styles.inputText}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={inputValues[element.id] || ""}
                    onChange={(e) => handleInputChange(e, element.id)}
                  />
                  <button onClick={handleButtonClick}>
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                      alt="submit-image"
                    />
                  </button>
                </div>
              )}
              {element.inputType === "inputPhone" && (
                <div className={styles.inputText}>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={inputValues[element.id] || ""}
                    onChange={(e) => handleInputChange(e, element.id)}
                  />
                  <button onClick={handleButtonClick}>
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                      alt="submit-image"
                    />
                  </button>
                </div>
              )}
              {element.inputType === "inputDate" && (
                <div className={styles.inputText}>
                  <input
                    type="date"
                    value={inputValues[element.id] || ""}
                    onChange={(e) => handleInputChange(e, element.id)}
                  />
                  <button onClick={handleButtonClick}>
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                      alt="submit-image"
                    />
                  </button>
                </div>
              )}
              {element.inputType === "inputRating" && (
                <div className={styles.ratingContainerWrapper}>
                  <div className={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => {
                          setInputValues({
                            ...inputValues,
                            [element.id]: rating,
                          });
                          handleButtonClick();
                        }}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <button onClick={handleButtonClick}>
                    <img
                      src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                      alt="submit-image"
                    />
                  </button>
                </div>
              )}
              {element.inputType === "inputButton" && (
                <div className={styles.submitButton}>
                  <button
                    onClick={() => {
                      alert("Form submitted successfully!");
                    }}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FillForm;


