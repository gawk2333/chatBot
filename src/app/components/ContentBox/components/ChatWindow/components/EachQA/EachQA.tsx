import React, { useMemo } from "react";
import styles from "./EachQA.module.css";
import { Image } from "semantic-ui-react";
import userImageUrl from "../../../../user.jpeg";
import botImageUrl from "../../../../openai.jpeg";
import { convertTimeStamp } from "../../../../../../../utils";

export interface eachQAProps {
  sentBy: string;
  content?: string | undefined;
  created?: number;
  isLoading?: boolean;
}

export default function EachQA(props: eachQAProps) {
  const { sentBy, content, created, isLoading } = props;

  const eachQAStyle: Object = useMemo(() => {
    return {
      width: "100%",
      paddingTop: "10px",
      paddingBottom: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      flexWrap: "nowrap",
      backgroundColor: sentBy === "Bot" ? "#e7ffe7" : "#e8eafc",
    };
  }, [sentBy]);

  const infoBarStyle: Object = useMemo(() => {
    return {
      width: "100%",
      display: "flex",
      flexDirection: sentBy === "Bot" ? "row" : "row-reverse",
      justifyContent: "flex-start",
      flexWrap: "nowrap",
      // backgroundColor: sentBy === "Bot" ? "#f1f1f1" : "#c0c0c0",
    };
  }, [sentBy]);

  const textContentStyle: Object = useMemo(() => {
    return {
      width: "100%",
      paddingTop: "10px",
      paddingLeft: "10px",
      paddingRight: "10px",
      display: "flex",
      flexDirection: sentBy === "Bot" ? "row" : "row-reverse",
    };
  }, [sentBy]);

  return (
    <div style={eachQAStyle}>
      <div style={infoBarStyle}>
        <Image
          src={sentBy === "Bot" ? botImageUrl : userImageUrl}
          className={styles.profileimg}
        />
        {!isLoading && (
          <div className={styles.timelabel}>{convertTimeStamp(created)}</div>
        )}
      </div>
      {isLoading ? (
        <div style={textContentStyle}>
          <div className={styles.ldsellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <div style={textContentStyle}>{content}</div>
      )}
    </div>
  );
}
