import React from "react";
import { Button } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./ChatWindow.module.css";

export default function ChatWindow() {
  return (
    <div className={styles.chatwindow}>
      <div className={styles.chatcontent}>ChatContent</div>
      <div className={styles.inputcontent}>
        <TextareaAutosize
          maxRows={5}
          minRows={1}
          className={styles.textinput}
        />
        <Button>Send</Button>
      </div>
    </div>
  );
}
