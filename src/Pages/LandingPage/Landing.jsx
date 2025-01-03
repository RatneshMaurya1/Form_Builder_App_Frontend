import React from "react";
import styles from "./landing.module.css";
import titleImage from "../../assets/TitleSvg.png";
import container1 from "../../assets/container1.png";
import container2 from "../../assets/container2.png";
import figureImage from "../../assets/Figure.png";
import detailImage from "../../assets/Details.png"
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.navBar}>
          <div className={styles.title}>
            <img src={titleImage} alt="Title-image" />
            <p>FormBot</p>
          </div>
          <div className={styles.btn}>
            <button className={styles.signInBtn} onClick={() => navigate("/login")}>Sign in</button>
            <button className={styles.createBtn} onClick={() => navigate("/login")}>Create a FormBot</button>
          </div>
        </div>

        <div className={styles.text}>
          <img
            className={styles.container1Image}
            src={container1}
            alt="container-image"
          />
          <img
            className={styles.container2Image}
            src={container2}
            alt="container-image"
          />
          <div className={styles.buildText}>
            <h1>Build advanced chatbots visually</h1>
            <p>
              Typebot gives you powerful blocks to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>
            <button>Create a FormBot for free</button>
          </div>
        </div>
        <div className={styles.figureImage}>
          <img src="https://res.cloudinary.com/dlmwurg10/image/upload/v1735887515/Container_vyk9gj.png" alt="figure-image" />
        </div>

        <div className={styles.allList}>
          <div className={styles.list}>
            <div className={styles.list1}>
              <div className={styles.list1Image}>
                <img src={titleImage} alt="title-image" />
                <p>FormBot</p>
              </div>
              <p className={styles.made}>Made with ❤️ by </p>
              <h1>@cuvette</h1>
            </div>
            <div className={styles.list2}>
              <h3>Product</h3>
              <div className={styles.list2Item}>
                <p>Status</p>
                <p>Documentation <img src={detailImage} alt="details-image" /></p>
                <p>Roadmap<img src={detailImage} alt="details-image" /></p>
                <p>Pricing</p>
              </div>
            </div>
            <div className={styles.list3}>
              <h3>Community</h3>
              <div className={styles.list3Item}>
                <p>Discord<img src={detailImage} alt="details-image" /></p>
                <p>GitHub repository<img src={detailImage} alt="details-image" /></p>
                <p>Twitter <img src={detailImage} alt="details-image" /></p>
                <p>LinkedIn<img src={detailImage} alt="details-image" /></p>
                <p>OSS Friends</p>
              </div>
            </div>
            <div className={styles.list2}>
              <h3>Company</h3>
              <div className={styles.list2Item}>
                <p>About</p>
                <p>Contact</p>
                <p>Term & Services</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
