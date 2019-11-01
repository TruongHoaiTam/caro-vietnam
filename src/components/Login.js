
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Icon } from 'antd';
import {
    Redirect,
    Link
} from "react-router-dom";
import '../index.css';

class Login extends React.Component {

    handleSubmit = e => {
        const { form } = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                const { actLoginRequest } = this.props;
                actLoginRequest(values);
            }
        });
    };

    render() {
        const { form, username, err, actGetUser, callbackLink } = this.props;
        const { getFieldDecorator } = form;
        actGetUser();



        if (username && username !== "undefined") {
            if (callbackLink) return <Redirect to={callbackLink} />;
            return <Redirect to="/" />;
        }
        if (err === 400) {
            document.getElementById('msg').innerHTML = 'Đăng nhập thất bại';
        }
        return (
            <div
                className="container-login100"
                style={{ backgroundColor: '#282c34' }}
            >
                <div style={{ display: 'block' }}>
                    <p className="hometitle">LOGIN</p>
                    <div className="btn">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <p id="msg" style={{ color: 'red' }} />
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Username"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>

                                <Link to="/user/register">&nbsp;Register now!</Link>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

const LoginForm = Form.create({})(Login);

export { LoginForm };
export default LoginForm;