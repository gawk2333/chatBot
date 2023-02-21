import React from "react";
import { Icon, Popup } from "semantic-ui-react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Chat bot</div>
      <div className={styles.setting}>
        <Icon name="setting" size="big" color="yellow" />
      </div>
    </div>
  );
}
