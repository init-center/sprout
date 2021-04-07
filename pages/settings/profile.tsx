import { Form, Input, message, Image, Button, Select, DatePicker } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DefaultWrapper } from "../../layout/DefaultWrapper/DefaultWrapper";
import {
  BanStatus,
  Gender,
  Group,
  UpdatePassword,
  UpdateUserInfo,
  UserPrivateInfo,
} from "../../types/users";
import http, { ResponseData } from "../../utils/http/http";
import styles from "../../styles/SettingProfile.module.scss";
import { telRegexp, urlRegexp } from "../../constants/regex";
import {
  validEmail,
  validName,
  validPassword,
} from "../../utils/valid/valid_rules";
import moment from "moment";
import { debounce } from "../../utils/debounce/debounce";
import { SEO } from "../../components/SEO/SEO";

const { Option } = Select;

const SettingProfile: FC = () => {
  const router = useRouter();
  const [form] = Form.useForm<UpdateUserInfo>();
  const [passwordForm] = Form.useForm<UpdatePassword>();
  const [userInfo, setUserInfo] = useState<UserPrivateInfo>({
    uid: "",
    name: "",
    avatar: "",
    intro: "",
    createTime: "",
    isBaned: BanStatus.NO,
    group: Group.DEFAULT,
    birthday: null,
    tel: "",
    email: "",
    gender: Gender.MALE,
  });
  const [isSendingCode, setIsSendingCode] = useState(false);
  const sendCodeBtnRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef(null);

  const fetchUserInfo = useCallback(async () => {
    try {
      const result = await http.get<ResponseData<UserPrivateInfo>>(
        "/users/private"
      );
      if (result.status === 200 && result.data.code === 2000) {
        const userInfo = result.data.data;
        setUserInfo(userInfo);
        form.setFieldsValue({
          name: userInfo.name,
          avatar: userInfo.avatar,
          intro: userInfo.intro,
          birthday: moment(userInfo.birthday),
          tel: userInfo.tel,
          email: userInfo.email,
          gender: userInfo.gender,
          eCode: "",
        });
      }
    } catch (error) {
      const msg = error?.response?.data?.message;
      if (msg) {
        message.destroy();
        message.error(msg);
      }

      if (error?.response?.status === 401) {
        router.push("/login");
      }
    }
  }, [form, router]);

  const onFinish = useMemo(
    () =>
      debounce(async (fields: UpdateUserInfo | UpdatePassword) => {
        try {
          const result = await http.put<ResponseData>("/users", {
            ...fields,
            birthday:
              "birthday" in fields
                ? moment(fields.birthday).format("YYYY-MM-DD")
                : null,
          });
          if (result.status === 200 && result.data.code === 2000) {
            message.destroy();
            message.success("修改成功！");
            fetchUserInfo();
            passwordForm.setFieldsValue({
              password: "",
              rePassword: "",
              eCode: "",
            });
          }
        } catch (error) {
          const msg = error?.response?.data?.message;
          if (msg) {
            message.destroy();
            message.error(msg);
          }

          if (error?.response?.status === 401) {
            router.push("/login");
          }
        }
      }),
    [fetchUserInfo, passwordForm, router]
  );

  const sendCode = useMemo(
    () =>
      debounce(async (codeType: number) => {
        if (isSendingCode) return;
        try {
          const validResult = await form.validateFields(["email"]);
          const email = validResult.email;
          const result = await http.post<ResponseData>("/vcode/ecode", {
            email,
            type: codeType,
          });
          if (result.status === 200) {
            let time = 120;
            setIsSendingCode(true);
            const sendCodeBtn = sendCodeBtnRef.current;
            const span = sendCodeBtn && sendCodeBtn.querySelector("span");
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
          return;
        }
      }),
    [form, isSendingCode]
  );

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  return (
    <DefaultWrapper>
      <SEO title="修改个人资料" />
      <div className={styles.profile}>
        <h1 className={styles.title}>个人资料</h1>
        <Form
          form={form}
          className={styles["info"]}
          onFinish={onFinish}
          initialValues={userInfo}
        >
          <h2 className={styles["sub-title"]}>基本资料</h2>
          <Form.Item
            name="name"
            key="name"
            label="用户名"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入用户名",
              },
              {
                validator: validName,
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <div className={styles["avatar-wrapper"]}>
            <Form.Item
              name="avatar"
              key="avatar"
              label="头像链接"
              rules={[
                {
                  required: true,
                  message: "请输入头像链接",
                },
                {
                  pattern: urlRegexp,
                  message: "请输入符合规范的链接地址",
                },
              ]}
              style={{ marginBottom: 0, flex: 1, paddingRight: "10px" }}
            >
              <Input
                placeholder="请输入头像链接"
                className={styles["cover-input"]}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, avatar: e.target.value })
                }
              />
            </Form.Item>
            <Image
              src={userInfo.avatar}
              width={60}
              height={60}
              placeholder={true}
              alt="avatar"
              onError={() =>
                userInfo.avatar &&
                message.error(
                  "头像图片加载错误，请检查是否填入了无法加载的图片地址！"
                )
              }
            />
          </div>
          <Form.Item
            name="email"
            key="email"
            label="邮箱"
            rules={[
              { required: true, message: "请输入邮箱！" },
              {
                validator: validEmail,
              },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="tel"
            key="tel"
            label="电话"
            rules={[
              {
                pattern: telRegexp,
                message: "请输入符合规范的电话号码",
              },
            ]}
          >
            <Input type="number" placeholder="请输入电话号码" />
          </Form.Item>
          <Form.Item name="birthday" key="birthday" label="生日">
            <DatePicker />
          </Form.Item>
          <Form.Item name="gender" key="gender" label="性别">
            <Select placeholder="未选择">
              <Option value={0}>男</Option>
              <Option value={1}>女</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="intro"
            key="intro"
            label="简介"
            style={{ width: "100%" }}
          >
            <Input placeholder="请输入简介" />
          </Form.Item>

          <Form.Item
            name="eCode"
            key="eCode1"
            rules={[
              { required: true, message: "请输入验证码！" },
              { min: 4, message: "验证码长度必须为4位！" },
              { max: 4, message: "验证码长度必须为4位！" },
            ]}
          >
            <Input
              prefix={<KeyOutlined />}
              placeholder="Code"
              className={styles["code-input"]}
              addonAfter={
                <Button
                  type="primary"
                  disabled={isSendingCode}
                  ref={sendCodeBtnRef}
                  className={styles["send-code-btn"]}
                  onClick={() => {
                    sendCode(2);
                  }}
                >
                  发送验证码
                </Button>
              }
            />
          </Form.Item>

          <div className={styles["submit-bar"]}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles["submit-button"]}
            >
              修改
            </Button>
          </div>
        </Form>

        <Form
          form={passwordForm}
          className={styles["update-pass"]}
          onFinish={onFinish}
          initialValues={{
            password: "",
            rePassword: "",
            eCode: "",
          }}
        >
          <h2 className={styles["sub-title"]}>修改密码</h2>
          <Form.Item
            name="password"
            key="password"
            label="密码"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请输入密码",
              },
              {
                validator: validPassword,
              },
            ]}
            style={{ width: "100%" }}
          >
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>

          <Form.Item
            name="rePassword"
            key="rePassword"
            label="重复密码"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "请重复输入密码",
              },
              {
                validator: validPassword,
              },
              ({ getFieldValue }) => ({
                validator(_rule, value) {
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
            ]}
            style={{ width: "100%" }}
          >
            <Input type="password" placeholder="请重复输入密码" />
          </Form.Item>

          <Form.Item
            name="eCode"
            key="eCode2"
            rules={[
              { required: true, message: "请输入验证码！" },
              { min: 4, message: "验证码长度必须为4位！" },
              { max: 4, message: "验证码长度必须为4位！" },
            ]}
          >
            <Input
              prefix={<KeyOutlined />}
              placeholder="Code"
              id="eCode2"
              className={styles["code-input"]}
              addonAfter={
                <Button
                  type="primary"
                  disabled={isSendingCode}
                  ref={sendCodeBtnRef}
                  className={styles["send-code-btn"]}
                  onClick={() => {
                    sendCode(3);
                  }}
                >
                  发送验证码
                </Button>
              }
            />
          </Form.Item>

          <div className={styles["submit-bar"]}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className={styles["submit-button"]}
            >
              修改
            </Button>
          </div>
        </Form>
      </div>
    </DefaultWrapper>
  );
};

export default SettingProfile;
