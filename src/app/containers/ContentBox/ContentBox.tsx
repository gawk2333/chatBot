import React from "react";
// import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindow";
import SettingPage from "./components/SettingPage";
import styles from "./ContentBox.module.css";

export default function ContentBox() {
  return (
    <div className={styles.contentbox}>
      {/* <ChatHistory /> */}
      <ChatWindow />
      <SettingPage />
    </div>
  );
}
