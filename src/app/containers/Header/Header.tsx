import React from "react";
import { Icon } from "semantic-ui-react";
import styles from "./header.module.css";
import {
  useAppDispatch,
  useAppSelector,
  AppDispatch,
  RootState,
} from "../../store";
import {
  addPage,
  removePage,
  PageState,
  pageTypes,
} from "../../store/pageSlice";

export default function Header() {
  const dispatch: AppDispatch = useAppDispatch();
  const pageState: PageState = useAppSelector((state: RootState) => {
    return state.page;
  });

  const handleSettingClick = () => {
    if (
      !pageState.currentPage.some(
        (page: pageTypes) => page === pageTypes.settingPage
      )
    ) {
      dispatch(addPage(pageTypes.settingPage));
    } else {
      dispatch(removePage(pageTypes.settingPage));
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
