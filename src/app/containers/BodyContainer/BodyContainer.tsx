import React from "react";
import Header from "../Header";
import ContentBox from "../ContentBox";
import styles from "./BodyContainer.module.css";

export default function BodyContainer() {
  return (
    <>
      <div className={styles.bodycontainer}>
        <Header />
        <ContentBox />
      </div>
    </>
  );
}
