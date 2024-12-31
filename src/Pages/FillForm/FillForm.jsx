import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getFillForm } from "../../Services";
import styles from "./fillform.module.css";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FillForm = () => {
  const { id } = useParams();
  const [formElements, setFormElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [inputData, setInputData] = useState([]);
  const [fillFormId, setFillFormId] = useState(null);
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

  const handleInputChange = (e, id) => {
    setInputValues({ ...inputValues, [id]: e.target.value });
  };
  const handleButtonClick = async (inputId) => {
    const currentElement = formElements[currentIndex];
    const inputValue = inputValues[currentElement.id];

    if (!inputValue || inputValue.trim() === "") {
      toast.error("Input cannot be empty!");
      return;
    }

    const filledFormData = !fillFormId
      ? {
          formId: id,
          responses: formElements.map((element) => ({
            elementId: element.id,
            type: element.inputType || "bubble",
            content: element.content,
            response: element.id === currentElement.id ? inputValue : "",
          })),
        }
      : {
          responses: [
            {
              elementId: currentElement.id,
              type: currentElement.inputType || "bubble",
              content: currentElement.content,
              response: inputValue,
            },
          ],
        };

    try {
      const endpoint = !fillFormId
        ? `${BACKEND_URL}/api/filled/forms`
        : `${BACKEND_URL}/api/filled/forms/${fillFormId}`;
      const method = !fillFormId ? "POST" : "PATCH";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filledFormData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          !fillFormId
            ? "Form created successfully!"
            : "Form updated successfully!"
        );
        if (!fillFormId) setFillFormId(data.filledForm._id);
      } else {
        toast.error(data.message || "Form submission failed.");
      }

      setInputData((prevData) => [
        ...prevData,
        { id: currentElement.id, value: inputValue },
      ]);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 500);
    } catch (error) {
      toast.error("Error submitting the form.");
    }
  };

  const handleSubmit = async () => {
    if (!fillFormId) {
      toast.error("Please complete the form first.");
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/api/filled/forms/${fillFormId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses: [], completed: true }), // Ensure responses is an array
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success("Form submitted successfully!");
      } else {
        toast.error(data.message || "Failed to submit the form.");
      }
    } catch (error) {
      toast.error("Error submitting the form.");
    }
  };
  


  useEffect(() => {
    if (formElements.length > 0 && currentIndex >= 0) {
      const currentElement = formElements[currentIndex];
      if (currentElement?.bubble) {
        const timer = setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [currentIndex, formElements]);

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
                  {inputData.some((data) => data.id === element.id) ? (
                    <p className={styles.filledValue}>
                      {inputData.find((data) => data.id === element.id).value}
                    </p>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder={element.content}
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button onClick={() => handleButtonClick(element.id)}>
                        <img
                          src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                          alt="submit-image"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
              {element.inputType === "inputNumber" && (
                <div className={styles.inputText}>
                  {inputData.some((data) => data.id === element.id) ? (
                    <p className={styles.filledValue}>
                      {inputData.find((data) => data.id === element.id).value}
                    </p>
                  ) : (
                    <>
                      <input
                        type="number"
                        placeholder={element.content}
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button onClick={() => handleButtonClick(element.id)}>
                        <img
                          src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                          alt="submit-image"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
              {element.inputType === "inputEmail" && (
                <div className={styles.inputText}>
                  {inputData.some((data) => data.id === element.id) ? (
                    <p className={styles.filledValue}>
                      {inputData.find((data) => data.id === element.id).value}
                    </p>
                  ) : (
                    <>
                      <input
                        type="email"
                        placeholder="enter your email"
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button onClick={() => handleButtonClick(element.id)}>
                        <img
                          src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                          alt="submit-image"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
              {element.inputType === "inputPhone" && (
                <div className={styles.inputText}>
                  {inputData.some((data) => data.id === element.id) ? (
                    <p className={styles.filledValue}>
                      {inputData.find((data) => data.id === element.id).value}
                    </p>
                  ) : (
                    <>
                      <input
                        type="tel"
                        placeholder="enter you phone number"
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button onClick={() => handleButtonClick(element.id)}>
                        <img
                          src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                          alt="submit-image"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
              {element.inputType === "inputDate" && (
                <div className={styles.inputText}>
                  {inputData.some((data) => data.id === element.id) ? (
                    <p className={styles.filledValue}>
                      {inputData.find((data) => data.id === element.id).value}
                    </p>
                  ) : (
                    <>
                      <input
                        type="date"
                        placeholder={element.content}
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button onClick={() => handleButtonClick(element.id)}>
                        <img
                          src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                          alt="submit-image"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
              {element.inputType === "inputRating" && (
                <div className={styles.ratingContainerWrapper}>
                  {inputData.some((data) => data.id === element.id) ? (
                    <p className={styles.filledValue}>
                      {inputData.find((data) => data.id === element.id).value}
                    </p>
                  ) : (
                    <>
                      <div className={styles.ratingContainer}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className={
                              inputValues[element.id] === rating.toString()
                                ? styles.selectedRating
                                : styles.unselectedRating
                            }
                            onClick={() => {
                              setInputValues({
                                ...inputValues,
                                [element.id]: rating.toString(),
                              });
                            }}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>

                      <button onClick={() => handleButtonClick(element.id)}>
                        <img
                          src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                          alt="submit-image"
                        />
                      </button>
                    </>
                  )}
                </div>
              )}
              {element.inputType === "inputButton" && (
                <div className={styles.submitButton}>
                  <button onClick={handleSubmit}>Submit</button>
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
