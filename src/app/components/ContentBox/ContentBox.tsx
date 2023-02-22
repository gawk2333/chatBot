import React, { useState, useEffect } from "react";
// import ChatHistory from "./components/ChatHistory";
import ChatWindow from "./components/ChatWindow";
import SettingPage from "./components/SettingPage";
import styles from "./ContentBox.module.css";
import { useAppSelector } from "../../store";
import { PageState } from "../../store/pageSlice";

export default function ContentBox() {
  const [showSettingPage, setShowSettingPage] = useState(false);
  const pageState: PageState = useAppSelector((state) => {
    return state.page;
  });

  useEffect(() => {
    setShowSettingPage(
      pageState.currentPage.some((page) => page === "settingPage")
    );
  }, [pageState]);

  return (
    <div className={styles.contentbox}>
      {/* <ChatHistory /> */}
      <ChatWindow />
      {showSettingPage ? <SettingPage /> : <></>}
    </div>
  );
}
