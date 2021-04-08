import React, { FC, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { THEME_KEY } from "../../constants";
import { THEME_CONFIG } from "../../constants/defaultConfig";
import { StateType } from "../../store";
import {
  setIsThemeModalShowAction,
  setThemeAction,
} from "../../store/global/actionCreator";
import { Theme } from "../../types/theme";
import combineClassNames from "../../utils/combineClassNames";
import styles from "./ThemeModal.module.scss";

const ThemeModal: FC = memo(() => {
  const dispatch = useDispatch();
  const currentTheme = useSelector<StateType, Theme>((state) => state.theme);
  const isThemeModalShow = useSelector<StateType, boolean>(
    (state) => state.isThemeModalShow
  );
  const closeThemeModal = useCallback(
    () => dispatch(setIsThemeModalShowAction(false)),
    [dispatch]
  );
  const onChangeTheme = useCallback(
    (theme: Theme) => {
      dispatch(setThemeAction(theme));
      window.localStorage.setItem(THEME_KEY, JSON.stringify(theme));
      closeThemeModal();
    },
    [closeThemeModal, dispatch]
  );

  return (
    <div
      className={combineClassNames(
        styles.mask,
        isThemeModalShow ? styles["modal-show"] : ""
      )}
      onClick={closeThemeModal}
    >
      <div className={styles["theme-bar"]}>
        {THEME_CONFIG.map((theme) => (
          <div className={styles["theme-item"]} key={theme.name}>
            <div
              className={styles["color-circle"]}
              style={{ backgroundColor: theme.color }}
              onClick={() => onChangeTheme(theme)}
            >
              {currentTheme.name === theme.name && (
                <svg viewBox="0 0 24 24" className={styles.selected}>
                  <g>
                    <path
                      d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 
                0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 
                1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            <img
              src={theme.imgUrl}
              alt={theme.name}
              title={theme.name}
              className={styles["theme-img"]}
            />
          </div>
        ))}
      </div>
    </div>
  );
});

export default ThemeModal;
