import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../store";
import { setIsMenuShowAction } from "../../store/global/actionCreator";
import combineClassNames from "../../utils/combineClassNames";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import styles from "./GlobalMenu.module.scss";
import { Dropdown, Menu } from "antd";
import { UserPrivateInfo } from "../../types/users";
import http, { ResponseData } from "../../utils/http/http";
import { TOKEN_KEY } from "../../constants";

const navList = [
  {
    name: "标签",
    path: "/tags",
  },
  {
    name: "分类",
    path: "/categories",
  },
  {
    name: "归档",
    path: "/archive",
  },
  {
    name: "友链",
    path: "/friends",
  },
  {
    name: "关于",
    path: "/about",
  },
];

const GlobalMenu = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isMenuShow = useSelector<StateType, boolean>(
    (state) => state.isMenuShow
  );
  const [userInfo, setUserInfo] = useState<UserPrivateInfo>(null);

  const navTo = useCallback(
    (path: string) => {
      router.push(path);
      dispatch(setIsMenuShowAction(false));
    },
    [dispatch, router]
  );

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
          <Menu.Item
            className={styles["dropdown-item"]}
            onClick={() => {
              navTo("/users");
            }}
          >
            个人中心
          </Menu.Item>
        ) : (
          <Menu.Item
            className={styles["dropdown-item"]}
            onClick={() => {
              navTo("/login");
            }}
          >
            登录
          </Menu.Item>
        )}
        {userInfo ? (
          <Menu.Item className={styles["dropdown-item"]} onClick={logout}>
            登出
          </Menu.Item>
        ) : null}
      </Menu>
    );
  }, [logout, navTo, userInfo]);

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
        {navList.map((nav) => (
          <li
            className={styles["nav-item"]}
            key={nav.name}
            onClick={() => {
              navTo(nav.path);
            }}
          >
            {nav.name}
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <Footer />
      </div>
    </div>
  );
});

export default GlobalMenu;
