import React from "react";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>Chat bot</div>
    </div>
  );
}
