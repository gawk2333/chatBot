import React from "react";
import { Icon } from "semantic-ui-react";
import styles from "./header.module.css";
import {
  useAppDispatch,
  useAppSelector,
  AppDispatch,
  RootState,
} from "../../store";
import { addPage, removePage, PageState } from "../../store/pageSlice";

export default function Header() {
  const dispatch: AppDispatch = useAppDispatch();
  const pageState: PageState = useAppSelector((state: RootState) => {
    return state.page;
  });

  const handleSettingClick = () => {
    if (!pageState.currentPage.some((page: string) => page === "settingPage")) {
      dispatch(addPage("settingPage"));
    } else {
      dispatch(removePage("settingPage"));
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo}>Chat bot</div>
      <div className={styles.setting} onClick={handleSettingClick}>
        <Icon name="setting" size="big" color="yellow" />
      </div>
    </div>
  );
}
