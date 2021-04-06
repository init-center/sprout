import React, { FC } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { validIdAndEmail, validPassword } from "../utils/valid/valid_rules";
import styles from "../styles/Login.module.scss";
import { useRouter } from "next/router";
import http from "../utils/http/http";
import backToPrevPage from "../utils/backToPrevPage";
import { TOKEN_KEY } from "../constants";

const Login: FC = () => {
  const router = useRouter();

  const login = async (values): Promise<void> => {
    try {
      const result = await http.post("/session", { ...values });
      if (result.status === 201 && result.data.code === 2001) {
        const token = result.data.data.token;
        localStorage.setItem(TOKEN_KEY, `Bearer ${token}`);
        message.success("登录成功！");
        backToPrevPage();
      }
    } catch (error) {}
  };
  return (
    <div className={styles.container}>
      <div className={styles["login-box"]}>
        <h2 className={styles.title}>欢迎回来，</h2>
        <h3 className={styles.intro}>请填写以下信息进行登录</h3>
        <Form onFinish={login} className={styles["form-box"]}>
          <Form.Item
            name="uid"
            rules={[
              { required: true, message: "请输入你的ID/Email！" },
              {
                validator: validIdAndEmail,
              },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="ID/Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入你的密码！" },
              {
                validator: validPassword,
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <span
            className={styles.forgot}
            onClick={(): void => {
              router.push("/forgot");
            }}
          >
            忘记了你的密码？
          </span>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className={styles["login-button"]}
          >
            登录
          </Button>
        </Form>
        <p className={styles["sign-up-tip"]}>
          还没有账号？
          <span
            className={styles["go-to-sign-up"]}
            onClick={(): void => {
              router.push("/signup");
            }}
          >
            立即注册
          </span>
        </p>
        <p className={styles["sign-up-tip"]}>
          暂不登录？
          <span
            onClick={(): void => {
              backToPrevPage();
            }}
            className={styles["go-to-sign-up"]}
          >
            继续浏览
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
