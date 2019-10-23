
import React from 'react';
import {
    NavLink
} from "react-router-dom";
import { Button } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
class Menu extends React.Component {
    render() {
        return (
            <div className="right">
                <header className="App-header">
                    <Button>
                        <NavLink to="/user/login">Đăng nhập</NavLink>
                    </Button>
                    <Button>
                        <NavLink exact to="/">Trang chủ</NavLink>
                    </Button>
                </header>
            </div>
        );
    }
}

export default Menu;
