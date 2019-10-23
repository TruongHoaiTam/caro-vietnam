import React from 'react';
import { Button } from 'antd';

// eslint-disable-next-line react/prefer-stateless-function
class Square extends React.Component {
    render() {
        const { isDetermined, isChoose, onClick, value } = this.props
        if (isDetermined === false) {
            if (isChoose) {
                return (
                    <Button type="primary" className="square choose" onClick={onClick}>
                        <b className="fa fa-bold" aria-hidden="true">
                            {value}
                        </b>
                    </Button>
                );
            }
            return (
                <Button type="button" className="square" onClick={onClick}>
                    <b className="fa fa-bold" aria-hidden="true">
                        {value}
                    </b>
                </Button>
            );
        }
        return (
            <Button type="danger" className="determinedSquare" onClick={onClick}>
                <b className="fa fa-bold" aria-hidden="true">
                    {value}
                </b>
            </Button>
        );
    }
}

export default Square;
