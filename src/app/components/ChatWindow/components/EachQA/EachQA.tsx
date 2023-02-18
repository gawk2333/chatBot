import React from "react";
import { Divider } from "semantic-ui-react";
import styles from "./EachQA.module.css";
import { Image } from "semantic-ui-react";
import userImageUrl from "../../../../user.jpeg";
import botImageUrl from "../../../../openai.jpeg";
import { convertTimeStamp } from "../../../../../utils";

export interface eachQAProps {
  sentBy: string;
  content: string | undefined;
  created: number;
}

export default function EachQA(props: eachQAProps) {
  const { sentBy, content, created } = props;
  return (
    <div className={styles.eachqa}>
      <div className={styles.infobar}>
        <Image
          src={sentBy === "Bot" ? botImageUrl : userImageUrl}
          className={styles.profileimg}
        />
        <div className={styles.timelabel}>{convertTimeStamp(created)}</div>
      </div>
      <div className={styles.textcontent}>{content}</div>
      <Divider />
    </div>
  );
}
