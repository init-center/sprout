import React, { FC, useState, useRef, useEffect, useMemo } from "react";
import { Form, Input, Button, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  KeyOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  validId,
  validPassword,
  validEmail,
  validName,
} from "../utils/valid/valid_rules";
import styles from "../styles/SignUp.module.scss";
import { useRouter } from "next/router";
import http, { ResponseData } from "../utils/http/http";
import backToPrevPage from "../utils/backToPrevPage";
import { debounce } from "../utils/debounce/debounce";
import { SEO } from "../components/SEO/SEO";

const SignUp: FC = () => {
  const router = useRouter();

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sendCodeBtnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    return (): void => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const sendCode = useMemo(
    () =>
      debounce(async () => {
        if (isSendingCode) return;
        const sendCodeBtn = sendCodeBtnRef.current;
        const span = sendCodeBtn && sendCodeBtn.querySelector("span");
        try {
          const validResult = await form.validateFields(["email"]);
          const email = validResult.email;
          setIsSendingCode(true);
          span.innerText = "发送中...";
          const result = await http.post<ResponseData>("/vcode/ecode", {
            email,
            type: 1,
          });
          if (result.status === 200) {
            let time = 120;

            span.innerText = String(time);
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
          }
        } catch (error) {
          const msg = error?.response?.data?.message;
          if (message && msg) {
            message.destroy();
            message.error(msg);
          }
          setIsSendingCode(false);
          span.innerText = "发送验证码";
          return;
        }
      }),
    [form, isSendingCode]
  );

  const signUp = useMemo(
    () =>
      debounce(async (values) => {
        setIsSubmitting(true);
        try {
          const result = await http.post<ResponseData>("/users", values);
          if (result.status === 201 && result.data.code === 2001) {
            message.success("注册成功！");
            router.push("/login");
          }
        } catch (error) {
          const msg = error?.response?.data?.message;
          if (message && msg) {
            message.destroy();
            message.error(msg);
          }
          return;
        } finally {
          setIsSubmitting(false);
        }
      }),
    [router]
  );

  return (
    <>
      <SEO title="注册" />
      <div className={styles.container}>
        <div className={styles["sign-up-box"]}>
          <h2 className={styles.title}>欢迎，</h2>
          <h3 className={styles.intro}>请填写以下信息进行注册</h3>
          <Form form={form} onFinish={signUp} className={styles["form-box"]}>
            <Form.Item
              name="uid"
              rules={[
                { required: true, message: "请输入ID！" },
                {
                  validator: validId,
                },
              ]}
            >
              <Input size="large" prefix={<UserOutlined />} placeholder="ID" />
            </Form.Item>
            <p className={styles.tips}>
              ID{" "}
              <strong className={styles["warning-tips"]}>使用后不能修改</strong>
              ，只能以字母开头，不能包含中文以及除下划线和中划线之外的符号，不能有连续的符号，不能以符号结尾，长度在
              2 - 12 位。
            </p>
            <Form.Item
              name="name"
              rules={[
                { required: true, message: "请输入用户名！" },
                {
                  validator: validName,
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Name" />
            </Form.Item>
            <p className={styles.tips}>
              用户名可以使用中文、英文、数字、中划线、下划线，但不能以数字和符号开头，不能以符号结尾，不能有连续的符号，长度在
              2 - 12 位。
            </p>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码！" },
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
            <p className={styles.tips}>
              密码必须包含必须包含大写字母、小写字母、数字，长度在 6 - 16 位。
            </p>
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
              name="email"
              rules={[
                { required: true, message: "请输入邮箱！" },
                {
                  validator: validEmail,
                },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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
              className={styles["sign-up-button"]}
            >
              {isSubmitting ? "注册中..." : "注册"}
            </Button>
          </Form>
          <p className={styles["login-tip"]}>
            已有账号？
            <span
              onClick={() => {
                router.push("/login");
              }}
              className={styles["go-to-login"]}
            >
              立即登录
            </span>
          </p>
          <p className={styles["login-tip"]}>
            暂不注册？
            <span
              onClick={() => {
                backToPrevPage();
              }}
              className={styles["go-to-login"]}
            >
              继续浏览
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
