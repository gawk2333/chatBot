import React from "react";
import Header from "../Header";
import ContentBox from "../ContentBox";
import styles from "./BodyContainer.module.css";

export default function BodyContainer() {
  const getMobileHeight = () => {
    return window.innerHeight;
  };

  return (
    <>
      <div
        className={styles.bodycontainer}
        style={{ height: getMobileHeight() }}
      >
        <Header />
        <ContentBox />
      </div>
    </>
  );
}
