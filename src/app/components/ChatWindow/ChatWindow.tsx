import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import EachQA from "./components/EachQA";
import styles from "./ChatWindow.module.css";
import { v4 } from "uuid";
import {
  getChatResponse,
  saveQuestion,
  chatItem,
  eachChoice,
} from "../../reducers/chatSlice";
import { useAppDispatch, useAppSelector, RootState } from "../../store";

export default function ChatWindow() {
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();
  const chatState = useAppSelector((state: RootState) => {
    return state.chat;
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent((e.target as any).value);
  };

  const handleSendButtonClick = () => {
    if (content) {
      const requestInfo: chatItem = {
        id: v4(),
        question: content,
        sentBy: "You",
        created: Date.now() / 1000,
        choices: [],
      };
      console.log("request", requestInfo);
      dispatch(saveQuestion(requestInfo));
      dispatch(getChatResponse(requestInfo));
    }
    setContent("");
  };

  return (
    <div className={styles.chatwindow}>
      <div className={styles.chatcontent}>
        {chatState.chatInfo.map((eachInfo: chatItem) => {
          return eachInfo.choices.map((choice: eachChoice) => {
            return (
              <EachQA
                sentBy={eachInfo.sentBy}
                content={choice.text}
                created={eachInfo.created}
              />
            );
          });
        })}
      </div>
      <div className={styles.inputcontent}>
        <TextareaAutosize
          maxRows={5}
          minRows={1}
          className={styles.textinput}
          value={content}
          onChange={handleTextChange}
        />
        <Button primary onClick={handleSendButtonClick}>
          Send
        </Button>
      </div>
    </div>
  );
}
