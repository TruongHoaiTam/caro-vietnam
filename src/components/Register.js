import React from "react";
import { Form, Input, Button, Icon, Upload } from "antd";
import "antd/dist/antd.css";
import { callApiRegister } from "../utils/apiCaller";
import "../index.css";

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                return callApiRegister(values).then(() => {
                    const { history } = this.props;
                    history.push('/user/login');
                }).catch(() => {
                    document.getElementById('msg').innerHTML = "Đăng ký thất bại";
                })
            }
            return err;
        });
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        const { confirmDirty } = this.state;
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <div
                className="container-login100"
                style={{ backgroundColor: '#282c34' }}
            >
                <div style={{ display: 'block' }}>
                    <p className="hometitle">REGISTER</p>
                    <div className="btn">
                        <Form onSubmit={this.handleSubmit} className="register-form">
                            <p id="msg" style={{ color: 'red' }} />
                            <Form.Item>
                                {getFieldDecorator('upload', {
                                    valuePropName: 'fileList',
                                    getValueFromEvent: this.normFile,
                                })(
                                    <Upload name="logo" action="/upload.do" listType="picture">
                                        <Button>
                                            <Icon type="upload" /> Click to upload
                                        </Button>
                                    </Upload>,
                                )}
                            </Form.Item>
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
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your password!'
                                        },
                                        {
                                            validator: this.validateToNextPassword
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('confirm', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please confirm your password!'
                                        },
                                        {
                                            validator: this.compareToFirstPassword
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="Confirm Password"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!'
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!'
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="Email"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const Register = Form.create({ name: "register" })(
    RegistrationForm
);

export default Register;

