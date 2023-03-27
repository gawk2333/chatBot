import React, { useRef, useEffect } from "react";
import { Button } from "semantic-ui-react";
import _ from "lodash";
import TextareaAutosize from "react-textarea-autosize";
import EachQA from "./components/EachQA";
import styles from "./ChatWindow.module.css";
import { v4 } from "uuid";
import {
  getChatResponse,
  saveQuestion,
  chatItem,
  eachChoice,
  ChatState,
} from "../../../../store/chatSlice";
import { updateInput } from "../../../../store/pageSlice";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  AppThunkDispatch,
} from "../../../../store";
import { PageState } from "../../../../store/pageSlice";

export default function ChatWindow() {
  const chatBottomRef = useRef(null);
  const dispatch: AppThunkDispatch = useAppDispatch();
  const chatState: ChatState = useAppSelector((state: RootState) => {
    return state.chat;
  });
  const pageState: PageState = useAppSelector((state: RootState) => {
    return state.page;
  });

  const scrollToBottom = () => {
    (chatBottomRef.current as any).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateInput((e.target as any).value));
  };

  const updatePrompt = (question: string): string => {
    const originPrompt = _.cloneDeep(pageState.pages.settingPage.chat.prompt);
    const chatHistoryArr = chatState.chatInfo.map((chat) => {
      return `${chat.sentBy}:${chat.choices[0].text}`;
    });
    let chatHistory;
    if (chatHistoryArr.length === 0) {
      chatHistory = `Human:${question} `;
    } else {
      chatHistory = chatHistoryArr?.reduce((prev, cur) => {
        return prev + " " + cur;
      });
    }
    return `${originPrompt} ${chatHistory}`;
  };

  const handleSendButtonClick = () => {
    if (pageState.pages.chatWindowPage.chatInput) {
      const completionSetting = _.cloneDeep(pageState.pages.settingPage.chat);
      const question = pageState.pages.chatWindowPage.chatInput;
      completionSetting.prompt = updatePrompt(question);
      const requestInfo: chatItem = {
        id: v4(),
        sentBy: "Human",
        question,
        created: Date.now() / 1000,
        choices: [],
        completionSetting,
      };
      dispatch(saveQuestion(requestInfo));
      dispatch(getChatResponse(requestInfo));
    }
    dispatch(updateInput(""));
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
        {chatState.isLoading && <EachQA sentBy={"AI"} isLoading={true} />}
        <div ref={chatBottomRef}></div>
      </div>
      <div className={styles.inputcontent}>
        <TextareaAutosize
          maxRows={5}
          minRows={1}
          className={styles.textinput}
          value={pageState.pages.chatWindowPage.chatInput}
          onChange={handleTextChange}
          onHeightChange={scrollToBottom}
        />
        <div className={styles.sendbutton}>
          <Button primary onClick={handleSendButtonClick}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
