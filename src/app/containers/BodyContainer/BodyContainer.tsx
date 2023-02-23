import React, { useState, useLayoutEffect } from "react";
import Header from "../Header";
import ContentBox from "../ContentBox";
import styles from "./BodyContainer.module.css";

export default function BodyContainer() {
  const [height, setHeight] = useState<number>(0);
  useLayoutEffect(() => {
    setHeight(window.innerHeight);
    window.addEventListener("resize", () => setHeight(window.innerHeight));
    return () =>
      window.removeEventListener("resize", () => setHeight(window.innerHeight));
  }, []);
  return (
    <>
      <div className={styles.bodycontainer} style={{ height: height }}>
        <Header />
        <ContentBox />
      </div>
    </>
  );
}
