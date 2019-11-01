import React from "react";
import { Form, Input, Button, Icon, Upload } from "antd";
import "antd/dist/antd.css";
import "../index.css";

class UpdateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFieldsAndScroll((error, values) => {
            if (!error) {
                const { actUpdateRequest } = this.props;
                const body = {
                    ...values,
                    usertoken: localStorage.getItem('usertoken')
                }
                actUpdateRequest(body);
                // eslint-disable-next-line no-shadow
                setTimeout(() => {
                    const { err, actLogout } = this.props;
                    if (err === 400) {
                        document.getElementById('msg').innerHTML = "Update thất bại";
                    } else {
                        actLogout();
                        const { history } = this.props;
                        history.push('/');
                    }

                }, 3000);


            }
        })
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        const { confirmDirty } = this.state;
        if (value && confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
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
                    <p className="hometitle">UPDATE ACCOUNT</p>
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
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!'
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
                                {getFieldDecorator('password', {
                                    rules: [
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
                                <Button type="primary" htmlType="submit" className="register-form-button">
                                    Update
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const Update = Form.create({ name: "update" })(
    UpdateForm
);

export default Update;

