import Link from "next/link";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { StateType } from "../../store";
import combineClassNames from "../../utils/combineClassNames";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import styles from "./GlobalMenu.module.scss";
import { Dropdown, Menu } from "antd";
import { UserPrivateInfo } from "../../types/users";
import { GLOBAL_MENU_NAV_LIST } from "../../constants/defaultConfig";
import http, { ResponseData } from "../../utils/http/http";
import { TOKEN_KEY } from "../../constants";

const GlobalMenu = memo(() => {
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );
  const [userInfo, setUserInfo] = useState<UserPrivateInfo>(null);

  const getUserInfo = useCallback(async () => {
    try {
      const result = await http.get<ResponseData<UserPrivateInfo>>(
        "/users/private"
      );
      if (result.status === 200 && result.data.code === 2000) {
        const userInfo = result.data.data;
        setUserInfo(userInfo);
      }
    } catch (error) {}
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY);
    setUserInfo(null);
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const menu = useMemo(() => {
    return (
      <Menu className={styles["dropdown-menu"]}>
        {userInfo ? (
          <Link href="/users">
            <Menu.Item className={styles["dropdown-item"]}>个人中心</Menu.Item>
          </Link>
        ) : (
          <Link href="/login">
            <Menu.Item className={styles["dropdown-item"]}>登录</Menu.Item>
          </Link>
        )}
        {userInfo ? (
          <Menu.Item className={styles["dropdown-item"]} onClick={logout}>
            登出
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }, [logout, userInfo]);

  return (
    <div
      className={combineClassNames(styles.menu, isMenuShow ? styles.show : "")}
    >
      <NavBar />
      <ul className={styles.navigator}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className={styles["avatar-round"]}>
            <div className={styles.avatar}>
              {userInfo ? (
                <img src={userInfo.avatar} alt="avatar" />
              ) : (
                <div className={styles.login}>登录</div>
              )}
            </div>
          </div>
        </Dropdown>
        {GLOBAL_MENU_NAV_LIST.map((nav) => (
          <Link href={nav.path}>
            <li className={styles["nav-item"]} key={nav.name}>
              {nav.name}
            </li>
          </Link>
        ))}
      </ul>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
});

export default GlobalMenu;
