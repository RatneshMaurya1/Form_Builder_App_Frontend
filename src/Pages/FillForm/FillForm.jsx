import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { addViewCount, getFillForm } from "../../Services";
import styles from "./fillform.module.css";
import { useAuth } from "../../components/Context/AuthContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const FillForm = () => {
  const { formId, id } = useParams();
  const [formElements, setFormElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValues, setInputValues] = useState({});
  const [inputData, setInputData] = useState([]);
  const [fillFormId, setFillFormId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toggle } = useAuth();

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

    if (
      currentElement.inputType === "inputEmail" &&
      !/\S+@\S+\.\S+/.test(inputValue)
    ) {
      toast.error("Invalid email format!");
      return;
    }
    if (
      currentElement.inputType === "inputPhone" &&
      !/^\d{10}$/.test(inputValue)
    ) {
      toast.error("Invalid phone number! Must be 10 digits.");
      return;
    }
    if (currentElement.inputType === "inputNumber" && isNaN(inputValue)) {
      toast.error("Please enter a valid number!");
      return;
    }
    if (
      currentElement.inputType === "inputDate" &&
      !/^\d{4}-\d{2}-\d{2}$/.test(inputValue)
    ) {
      toast.error("Invalid date format! Use YYYY-MM-DD.");
      return;
    }

    const filledFormData = !fillFormId
      ? {
          formId: formId,
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
    setLoading(true);
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
            ? "Form updated successfully!"
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
      }, 1000);
    } catch (error) {
      toast.error("Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!fillFormId) {
      toast.error("Please complete the form first.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/filled/forms/${fillFormId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ responses: [], completed: true }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Form submitted successfully!");
        navigate("/");
      } else {
        toast.error(data.message || "Failed to submit the form.");
      }
    } catch (error) {
      toast.error("Error submitting the form.");
    } finally {
      setLoading(false);
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

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await addViewCount(formId);
      } catch (error) {
        toast.error("Error fetching form");
      }
    };

    fetchForm();
  }, []);

  return (
    <div className={styles.formContainer}>
      {formElements.slice(0, currentIndex + 1).map((element) => (
        <div key={element.id} className={styles.formElement}>
          {element.bubble && (
            <div className={styles.bubble}>
              {element.bubble === "bubbleText" && (
                <div className={styles.bubbleText}>
                  <img
                    className={styles.inputTextImg}
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
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        type="text"
                        placeholder={element.content}
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />

                      <button
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        onClick={() => handleButtonClick(element.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          "wait..."
                        ) : (
                          <img
                            className={styles.biuttonImg}
                            src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                            alt="submit-image"
                          />
                        )}
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
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        type="number"
                        placeholder={element.content}
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        disabled={true}
                        onClick={() => handleButtonClick(element.id)}
                      >
                        {loading ? (
                          "wait..."
                        ) : (
                          <img
                            className={styles.biuttonImg}
                            src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                            alt="submit-image"
                          />
                        )}
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
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        type="email"
                        placeholder="enter your email"
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        onClick={() => handleButtonClick(element.id)}
                        disabled={true}
                      >
                        {loading ? (
                          "wait..."
                        ) : (
                          <img
                            className={styles.biuttonImg}
                            src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                            alt="submit-image"
                          />
                        )}
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
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        type="tel"
                        placeholder="enter you phone number"
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        onClick={() => handleButtonClick(element.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          "wait..."
                        ) : (
                          <img
                            className={styles.biuttonImg}
                            src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                            alt="submit-image"
                          />
                        )}
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
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        type="date"
                        placeholder={element.content}
                        value={inputValues[element.id] || ""}
                        onChange={(e) => handleInputChange(e, element.id)}
                      />
                      <button
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        onClick={() => handleButtonClick(element.id)}
                        disabled={loading}
                      >
                        {loading ? (
                          "wait..."
                        ) : (
                          <img
                            className={styles.biuttonImg}
                            src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735574343/send_k57jod.png"
                            alt="submit-image"
                          />
                        )}
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
                      <div
                        className={`${styles.ratingContainer} ${
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }`}
                      >
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

                      <button
                        className={
                          localStorage.getItem("theme") === "dark"
                            ? styles.dark
                            : ""
                        }
                        onClick={() => handleButtonClick(element.id)}
                      >
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
                  <button disabled={loading} onClick={handleSubmit}>
                    {loading ? "Loading..." : "Submit"}
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
