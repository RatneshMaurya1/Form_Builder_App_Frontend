import React, { useState, useEffect } from "react";
import styles from "./response.module.css";
import { useAuth } from "../../components/Context/AuthContext";
import Toggle from "../../components/Toggle/Toggle";
import {
  getFilledFormDta,
  getFillFormLink,
  getViewCount,
  getWorkspaceForm,
} from "../../Services";
import closeImage from "../../assets/close.png";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { PieChart } from "react-minimal-pie-chart";

const Response = () => {
  const [fillFormData, setFillFormData] = useState(null);
  const [formLinkLoading, setFormLinkLoading] = useState(false);
  const [filledFormData, setFilledFormData] = useState([]);
  const [viewCount, setViewCount] = useState(0);
  const [startData, setStartData] = useState(0);
  const { toggle } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleGenerateFillFormLink = async () => {
    setFormLinkLoading(true);
    try {
      const response = await getFillFormLink(id);
      if (response.message === "Form link generated successfully!") {
        navigator.clipboard.writeText(response.formLink).then(() => {
          toast.success("Link copied to clipboard!");
        });
      }
    } catch (error) {
      toast.error("Error saving form:", error);
    } finally {
      setFormLinkLoading(false);
    }
  };
  const getCreatedForm = async () => {
    try {
      const response = await getWorkspaceForm(id);
      setFillFormData(response.form);
    } catch (error) {
      toast.error(error.message || "Error while getting the form");
    }
  };

  useEffect(() => {
    getCreatedForm();
  }, []);

  const handleSaveForm = () => {
    if (fillFormData) {
      return toast.error(
        "The form has been created with fields. You can now share it."
      );
    } else {
      return toast.error("You can save form in flow page only.");
    }
  };

  useEffect(() => {
    const getFilledForm = async () => {
      try {
        const response = await getFilledFormDta(id);
        setFilledFormData(response.filledForm);
        setStartData(response.filledForm.length);
      } catch (error) {
        toast.error(error.message || "Error while getting the form");
      }
    };
    getFilledForm();
  }, [startData]);

  useEffect(() => {
    const getView = async () => {
      try {
        const response = await getViewCount(id);
        setViewCount(response.data?.views || 0);
      } catch (error) {
        setViewCount(0);
        toast.error(error.message || "Error while getting the form");
      }
    };
    getView();
  }, []);
  const completedCount = filledFormData.filter((form) => form.completed).length;

  const completionPercentage = (completedCount / viewCount) * 100;
  const nonCompletionPercentage = 100 - completionPercentage;
  console.log(completionPercentage);

  const chartData = [
    { title: "Completed", value: completionPercentage, color: "#3B82F6",border:"1px solid #ffffff" },
    {
      title: "Non-Completed",
      value: nonCompletionPercentage,
      color: "#909090",
      border: '4px solid red' 
    },
  ];

  const userId = localStorage.getItem("userId");

  return (
    <>
      <div
        className={`${styles.createFormContainer} ${
          toggle ? "" : styles.light
        }`}
      >
        <nav className={toggle ? "" : styles.light}>
          <div className={styles.formNameInput}></div>
          <div className={styles.flowAndResponse}>
            <p
              className={toggle ? "" : styles.light}
              onClick={() => navigate(`/create/form/${id}`)}
            >
              Flow
            </p>
            <div className={styles.flow}>
              <p>Response</p>
            </div>
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
              {fillFormData ? (
                <button
                  onClick={() => handleGenerateFillFormLink()}
                  className={styles.shareButton1}
                >
                  {formLinkLoading ? "Loading..." : "Share"}
                </button>
              ) : (
                <button className={styles.shareButton2}>Share</button>
              )}

              <button onClick={handleSaveForm} className={styles.saveButton}>
                Save
              </button>
              <img
                onClick={() => navigate(`/dashboard/${userId}`)}
                src={closeImage}
                alt="close-image"
              />
            </div>
          </div>
        </nav>

        <div className={styles.saveAndStart}>
          <div className={`${styles.save} ${toggle ? "" : styles.light}`}>
            <p className={toggle ? "" : styles.light}>Views</p>
            <h3 className={toggle ? "" : styles.light}>{viewCount}</h3>
          </div>
          <div className={`${styles.start} ${toggle ? "" : styles.light}`}>
            <p className={toggle ? "" : styles.light}>Starts</p>
            <h3 className={toggle ? "" : styles.light}>{startData}</h3>
          </div>
        </div>

        {filledFormData.length > 0 ? (
          <>
            <div className={styles.tableContainer}>
              <table className={`${styles.responseTable} ${toggle ? "" : styles.light}`}>
                <thead>
                  <tr>
                    <th className={toggle ? "" : styles.light}></th>
                    <th className={toggle ? "" : styles.light}>Submitted At</th>
                    {filledFormData[0]?.responses?.map((response, index) => (
                      <th className={toggle ? "" : styles.light} key={index}>
                        {response.type === "inputText"
                          ? "Text"
                          : "" || response.type === "inputEmail"
                          ? "Email"
                          : "" || response.type === "inputDate"
                          ? "Date"
                          : "" || response.type === "inputRating"
                          ? "Rating"
                          : "" || response.type === "inputButton"
                          ? "Submit Button"
                          : "" || response.type}
                        : {response.content}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filledFormData.map((form, formIndex) => (
                    <tr key={formIndex}>
                      <td className={toggle ? "" : styles.light}>{formIndex + 1}</td>
                      <td className={toggle ? "" : styles.light}>
                        {form.completed
                          ? new Date(form.updatedAt)
                              .toLocaleString("en-IN", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                                timeZone: "Asia/Kolkata",
                              })
                              .replace(",", "")
                          : ""}
                      </td>
                      {form.responses.map((response, responseIndex) => (
                        <td className={toggle ? "" : styles.light} key={responseIndex}>
                          {response.type === "inputButton"
                            ? form.completed
                              ? "True"
                              : "False"
                            : response.type === "bubble"
                            ? response.content
                            : response.response || ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.percentage}>
              <div className={styles.chart}>
                <PieChart
                className={styles.pie}
                  data={chartData}
                  lineWidth={30}
                  startAngle={-90}
                  // animate
                  // radius={40}
                />
                {/* <p>Completed {parseInt(completionPercentage)}</p> */}
              </div>
              <div className={`${styles.completion} ${toggle ? "" : styles.light}`}>
                <p className={toggle ? "" : styles.light}>Completion rate</p>
                <h3 className={toggle ? "" : styles.light}>{parseInt(completionPercentage)}%</h3>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.noResponse}>
            <p>No Response yet collected</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Response;
