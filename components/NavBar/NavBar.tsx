import { useRouter } from "next/router";
import React, { CSSProperties, FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarsOutlined, CloseOutlined } from "@ant-design/icons";
import { WEBSITE_NAME_KEY } from "../../constants/configKey";
import { DEFAULT_WEBSITE_NAME } from "../../constants/defaultConfig";
import { StateType } from "../../store";
import { ConfigItem } from "../../types/config";
import styles from "./NavBar.module.scss";
import {
  setIsDarkModeAction,
  setIsMenuShowAction,
} from "../../store/global/actionCreator";
import IconFont from "../IconFont/IconFont";

interface NavBarProps {
  logoStyles?: CSSProperties;
  controlItemStyles?: CSSProperties;
}

const NavBar: FC<NavBarProps> = memo(({ logoStyles, controlItemStyles }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );
  const isDarkMode = useSelector<StateType, boolean>(
    (state) => state.isDarkMode
  );
  const websiteName = useSelector<StateType, ConfigItem>(
    (state) => state.configs[WEBSITE_NAME_KEY]
  );

  const toggleIsMenuShow = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      dispatch(setIsMenuShowAction(!isMenuShow));
    },
    [dispatch, isMenuShow]
  );

  const toggleIsDarkMode = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.stopPropagation();
      if (isDarkMode) {
        sessionStorage.setItem("isDark", "false");
      } else {
        sessionStorage.setItem("isDark", "true");
      }
      dispatch(setIsDarkModeAction(!isDarkMode));
    },
    [dispatch, isDarkMode]
  );

  return (
    <div className={styles.navbar}>
      <div
        className={styles.logo}
        style={logoStyles}
        onClick={(e) => {
          e.stopPropagation();
          router.pathname !== "/" && router.push("/");
          dispatch(setIsMenuShowAction(false));
        }}
      >
        {websiteName?.value ?? DEFAULT_WEBSITE_NAME}
      </div>
      <div className={styles["control-bar"]}>
        <div
          className={styles["control-item"]}
          style={controlItemStyles}
          onClick={toggleIsDarkMode}
        >
          {isDarkMode ? (
            <IconFont type="icon-Moon3" />
          ) : (
            <IconFont type="icon-Sun1" />
          )}
        </div>
        <div
          className={styles["control-item"]}
          style={controlItemStyles}
          onClick={toggleIsMenuShow}
        >
          {isMenuShow ? <CloseOutlined /> : <BarsOutlined />}
        </div>
      </div>
    </div>
  );
});

export default NavBar;
