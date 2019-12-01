
import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Icon, Modal } from 'antd';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import {
    Redirect,
    Link
} from "react-router-dom";
import '../index.css';



class Login extends React.Component {

    facebookResponse = (e) => {
        const options = { access_token: e.accessToken }
        const { actLoginFacebookRequest } = this.props;
        actLoginFacebookRequest(options);
    };

    googleResponse = (e) => {
        console.log(e)
        const options = { access_token: e.accessToken }
        const { actLoginGoogleRequest } = this.props;
        actLoginGoogleRequest(options);
    };

    onFailure = (error) => {
        const { info } = Modal;
        info(error);
    }

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



        if ((username && username !== "undefined")) {
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
                            <div>
                                <FacebookLogin
                                    cssClass="btnFacebook"
                                    appId="421347415482137"
                                    autoLoad={false}
                                    fields="name,email,picture"
                                    callback={this.facebookResponse} />
                                <br />
                                <GoogleLogin
                                    className="btnGoogle"
                                    clientId="200927370909-24etmol2n45sebnqe0vgia4nkab6bmvu.apps.googleusercontent.com"
                                    buttonText="Login"
                                    onSuccess={this.googleResponse}
                                    onFailure={this.googleResponse}
                                />
                            </div>
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