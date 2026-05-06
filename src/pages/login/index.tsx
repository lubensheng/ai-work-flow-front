import { Button, Form, Input } from "antd";
import styles from "./index.module.less";
import { useNavigate } from "react-router";

function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      localStorage.setItem("userInfo", JSON.stringify({ ...values }));
      navigate("/workFlow", { replace: true });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <div className={styles["form-container"]}>
        <Form form={form} className={styles.form}>
          <h2 className={styles.title}>AI 工作平台</h2>
          <Form.Item
            name="account"
            label="账号"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <div>
            <Button
              type="primary"
              className={styles.submit}
              onClick={handleLogin}
            >
              登录
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
