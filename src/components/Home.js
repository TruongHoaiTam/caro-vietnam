import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {
    render() {
        const { username, actLogout, actGetUser, actCallbackLink } = this.props;
        actGetUser();
        if (username === undefined || username === "undefined" || username == null) {
            return (
                <div
                    className="container-login100"
                    style={{ backgroundColor: '#282c34' }}
                >
                    <div style={{ display: 'block' }}>
                        <p className="hometitle">Game Caro</p>
                        <div className="btn">
                            <Link to="/user/login">
                                <Button
                                    type="danger"
                                    size="large"
                                    onClick={actCallbackLink('/')}
                                    style={{ width: '100%' }}
                                >
                                    Login
                                </Button>
                            </Link>
                            <br />
                            <br />
                            <Link to="/user/register">
                                <Button
                                    type="danger"
                                    size="large"
                                    onClick={actCallbackLink('/')}
                                    style={{ width: '100%' }}
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div
                className="container-login100"
                style={{ backgroundColor: '#282c34' }}
            >
                <div style={{ display: 'block' }}>
                    <p className="hometitle">Caro VN</p>
                    <p className="usernamehome">Hello, {username}!</p>
                    <br />
                    <div className="btn">
                        <Link to="/game">
                            <Button
                                type="primary"
                                size="large"
                                style={{ width: '100%' }}
                            >
                                Play Game
                            </Button>
                        </Link>
                        <br />
                        <br />
                        <Button
                            type="danger"
                            size="large"
                            style={{ width: '100%' }}
                            onClick={actLogout}

                        >
                            Logout
                        </Button>
                        <br />
                        <br />
                        <Link to="/user/update">
                            <Button
                                type="danger"
                                size="large"
                                onClick={actCallbackLink('/')}
                                style={{ width: '100%' }}
                            >
                                Update account
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );

    }
}

export default Home;
