import React from "react";
// import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindow";
import styles from "./ContentBox.module.css";

export default function ContentBox() {
  return (
    <div className={styles.contentbox}>
      {/* <ChatHistory /> */}
      <ChatWindow />
    </div>
  );
}
