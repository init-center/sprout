import React, { FC, useCallback, useRef, useState } from "react";
import http, { ResponseData } from "../utils/http/http";
import { SEO } from "../components/SEO/SEO";
import { Form, Input, Button, message } from "antd";
import { LockOutlined, KeyOutlined, MailOutlined } from "@ant-design/icons";
import { validEmail, validPassword } from "../utils/valid/valid_rules";
import styles from "../styles/Forgot.module.scss";
import { useRouter } from "next/router";

const Forgot: FC = () => {
  const router = useRouter();
  const [isSendingCode, setIsSendingCode] = useState(false);
  const sendCodeBtnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef(null);
  const [form] = Form.useForm();

  const sendCode = async (): Promise<void> => {
    if (isSendingCode) return;
    try {
      const validResult = await form.validateFields(["email"]);
      const email = validResult.email;
      await http.post("/vcode/ecode", {
        email,
        type: 3,
      });
      let time = 120;
      setIsSendingCode(true);
      const sendCodeBtn = sendCodeBtnRef.current;
      const span = sendCodeBtn && sendCodeBtn.querySelector("span");
      timerRef.current = setInterval(() => {
        if (time <= 0) {
          clearInterval(timerRef.current);
          span.innerText = "发送验证码";
          setIsSendingCode(false);
        } else {
          time -= 1;
          span.innerText = String(time);
        }
      }, 1000);
    } catch (error) {
      return;
    }
  };

  const onFinish = useCallback(
    async (form) => {
      try {
        const result = await http.put("/", { ...form });
        if (result.status === 200 && result.data.code === 2000) {
          message.success("修改成功！");
          router.push("/");
        }
      } catch (error) {
        const msg = error?.response?.data?.message;
        if (msg) {
          message.destroy();
          message.error(msg);
        }
      }
    },
    [router]
  );

  return (
    <div className={styles.container}>
      <div className={styles["forgot-box"]}>
        <h2 className={styles.title}>修改密码</h2>
        <h3 className={styles.intro}>请填写以下信息修改密码</h3>
        <Form onFinish={onFinish} className={styles["form-box"]}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "请输入你的邮箱！" },
              {
                validator: validEmail,
              },
            ]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
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
          <Form.Item
            name="rePassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "请确认密码！" },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  try {
                    if (value.length === 0) {
                      return Promise.reject("");
                    }
                    if (getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("两次输入的密码不一致！");
                  } catch (err) {
                    return Promise.reject("");
                  }
                },
              }),
              {
                validator: validPassword,
              },
            ]}
          >
            <Input
              size="large"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>
          <Form.Item
            name="eCode"
            rules={[
              { required: true, message: "请输入验证码！" },
              { min: 4, message: "验证码长度必须为4位！" },
              { max: 4, message: "验证码长度必须为4位！" },
            ]}
          >
            <Input
              size="large"
              prefix={<KeyOutlined />}
              placeholder="Code"
              className={styles["code-input"]}
              addonAfter={
                <Button
                  type="primary"
                  size="large"
                  disabled={isSendingCode}
                  ref={sendCodeBtnRef}
                  className={styles["send-code-btn"]}
                  onClick={() => {
                    sendCode();
                  }}
                >
                  发送验证码
                </Button>
              }
            />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className={styles["submit-button"]}
          >
            修改
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Forgot;
