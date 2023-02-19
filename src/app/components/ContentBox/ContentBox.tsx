import React from "react";
// import ChatHistory from "../ChatHistory";
import ChatWindow from "../ChatWindow";
import styles from "./ContentBox.module.css";

export default function ContentBox() {
  return (
    <div className={styles.contentbox}>
      {/* <ChatHistory /> */}
      <ChatWindow />
    </div>
  );
}
